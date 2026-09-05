const { test } = require('node:test');
const assert = require('node:assert/strict');
const progress = require('../docs/progress-store.js');

test('untrusted, old phase, and corrupt stored values never award completion', () => {
  for (const value of [null, 'all', 5, {}, {version: 2, completed: [1]}]) assert.deepEqual(progress.normalize(value).completed, []);
  assert.deepEqual(progress.read({getItem: () => '{broken'}).completed, []);
  assert.deepEqual(progress.normalize({version: 1, completed: [1,1,0,31,2.5,'3',null,30]}).completed, [1,30]);
});
test('mark, persist, reload, and undo a day without changing other days', () => {
  const original = {version:1, completed:[1,3]};
  const updated = progress.toggle(original, 2);
  assert.deepEqual(original.completed, [1,3]);
  let value;
  const storage = {setItem: (key, data) => { assert.equal(key, progress.KEY); value = data; }, getItem: () => value};
  assert.equal(progress.save(storage, updated), true);
  assert.deepEqual(progress.read(storage).completed, [1,2,3]);
  assert.deepEqual(progress.toggle(progress.read(storage), 2).completed, [1,3]);
});
test('resume chooses the first gap and handles the finished course', () => {
  assert.equal(progress.nextDay({version:1, completed:[1,3,30]}), 2);
  assert.equal(progress.nextDay({version:1, completed:Array.from({length:30},(_,i)=>i+1)}), null);
});
test('blocked or full storage fails explicitly', () => {
  assert.deepEqual(progress.read(undefined).completed, []);
  assert.equal(progress.save({setItem: () => {throw Error('Quota exceeded');}}, {version:1,completed:[1]}), false);
});
test('all day routes resolve exactly; resources cannot mark a whole day complete', () => {
  for (let day=1; day<=30; day++) assert.equal(progress.dayFromPath('#'+progress.path(day)+'.md?id=exercise'), day);
  assert.equal(progress.dayFromPath('/curriculum/days/phase-1/day-01/resources'), null);
  assert.equal(progress.dayFromPath('/curriculum/days/phase-1/day-01/exercises/README'), null);
  assert.equal(progress.dayFromPath('/curriculum/days/phase-1/day-30'), null);
  assert.throws(() => progress.path(31), RangeError);
});
