// Auth UI contract checks; Google account/consent interaction still requires a real browser.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

async function workspace({
  hash = "",
  oauthError = null,
  sessionError = null,
  recovery = false,
} = {}) {
  const nodes = new Map();
  const node = (id) => {
    if (!nodes.has(id))
      nodes.set(id, {
        textContent: "",
        disabled: false,
        hidden: false,
        addEventListener(event, handler) {
          this[event] = handler;
        },
        querySelectorAll() {
          return [(this.button ||= { disabled: false })];
        },
      });
    return nodes.get(id);
  };
  const root = node("workspace-main");
  node("sign-out");
  Object.defineProperty(root, "innerHTML", {
    get() {
      return this.html;
    },
    set(html) {
      this.html = html;
      for (const id of [...nodes.keys()])
        if (!id.startsWith("workspace-") && id !== "sign-out") nodes.delete(id);
      for (const match of html.matchAll(/id="([^"]+)"/g)) node(match[1]);
    },
  });
  const calls = [],
    replaced = [];
  const context = vm.createContext({
    document: {
      querySelector: (selector) => node(selector.slice(1)),
      getElementById: (id) => nodes.get(id) || null,
    },
    window: {
      SEEKER_SUPABASE: {
        url: "https://example.supabase.co",
        publishableKey: "public-test-key",
      },
    },
    location: {
      origin: "https://sn8c29kyhh-star.github.io",
      pathname: "/seeker/workspace.html",
      hash,
      search: "",
    },
    history: { replaceState: (...args) => replaced.push(args) },
    URL,
    URLSearchParams,
    FormData: class {},
    createClient: () => ({
      auth: {
        signInWithOAuth: async (args) => {
          calls.push(args);
          return { data: {}, error: oauthError };
        },
        onAuthStateChange: (callback) => {
          if (recovery) callback("PASSWORD_RECOVERY");
        },
        getSession: async () => ({
          data: { session: null },
          error: sessionError,
        }),
      },
    }),
  });
  const source = fs
    .readFileSync(require.resolve("../docs/workspace.js"), "utf8")
    .replace(/^import .*?;\n/, "");
  await vm.runInContext(`(async () => {${source}\n})()`, context);
  return { nodes, root, calls, replaced, notice: node("workspace-message") };
}

test("Google sign-in is available without filling email/password, including signup", async () => {
  const app = await workspace();
  assert.match(app.root.innerHTML, /Continue with Google/);
  const form = app.nodes.get("google-form");
  let prevented = false;
  form.submit({
    preventDefault() {
      prevented = true;
    },
    currentTarget: form,
  });
  assert.equal(
    form.button.disabled,
    true,
    "disable repeated submission while redirect starts",
  );
  await new Promise(setImmediate);
  assert.equal(prevented, true);
  assert.equal(app.calls.length, 1);
  assert.equal(app.calls[0].provider, "google");
  assert.equal(
    app.calls[0].options.redirectTo,
    "https://sn8c29kyhh-star.github.io/seeker/workspace.html",
  );
  assert.equal(app.calls[0].options.queryParams.prompt, "select_account");
  assert.equal(
    app.calls[0].options.scopes,
    undefined,
    "no extra Google data access",
  );
  app.nodes.get("auth-switch").click();
  assert.match(app.root.innerHTML, /Create your account/);
  assert.ok(app.nodes.get("google-form"));
  app.nodes.get("auth-reset").click();
  assert.equal(
    app.nodes.has("google-form"),
    false,
    "password recovery has its own form",
  );
});

test("OAuth initiation failures show a retryable error", async () => {
  const app = await workspace({
    oauthError: { message: "Provider unavailable" },
  });
  const form = app.nodes.get("google-form");
  form.submit({ preventDefault() {}, currentTarget: form });
  await new Promise(setImmediate);
  assert.equal(app.notice.textContent, "Provider unavailable");
  assert.equal(form.button.disabled, false);
});

test("cancelled Google callbacks return to sign-in and clear error URL", async () => {
  const app = await workspace({
    hash: "#error=access_denied&error_description=untrusted-text",
  });
  assert.match(app.notice.textContent, /Sign-in was not completed/);
  assert.doesNotMatch(app.notice.textContent, /untrusted-text/);
  assert.ok(app.nodes.get("google-form"));
  assert.equal(app.replaced[0][2], "/seeker/workspace.html");
});

test("session initialization errors do not strand users on a loading screen", async () => {
  const app = await workspace({
    sessionError: { message: "Invalid callback" },
  });
  assert.match(app.notice.textContent, /couldn't complete sign-in/);
  assert.ok(app.nodes.get("google-form"));
});

test("email password recovery remains available without an OAuth button", async () => {
  const app = await workspace({ recovery: true });
  assert.match(app.root.innerHTML, /Choose a new password/);
  assert.equal(app.nodes.has("google-form"), false);
  assert.ok(app.nodes.get("auth-form"));
});
