"""Check local navigation and script assets before GitHub Pages publication."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
errors = []
sidebar = (root / 'docs/_sidebar.md').read_text()
links = re.findall(r'\]\(([^)]+)\)', sidebar)
for link in links:
    if not link.startswith('/'):
        errors.append(f'Sidebar links must be root-relative: {link}')
    if not (root / 'docs' / link.lstrip('/')).exists():
        errors.append(f'Missing sidebar target: {link}')
for day in range(1, 31):
    phase = 1 if day <= 7 else 2 if day <= 14 else 3 if day <= 20 else 4 if day <= 25 else 5
    path = f'/curriculum/days/phase-{phase}/day-{day:02}' + ('/README.md' if day == 1 else '.md')
    if path not in links:
        errors.append(f'Day {day} absent from sidebar')
for asset in re.findall(r'(?:src|href)="([^"#]+)"', (root / 'docs/index.html').read_text() + (root / 'docs/workspace.html').read_text()):
    if not asset.startswith(('https://', 'http://')) and not (root / 'docs' / asset).exists():
        errors.append(f'Missing local asset: {asset}')
for route in re.findall(r'href="#/([^"?]+)"', (root / 'docs/README.md').read_text()):
    if not (root / 'docs' / (route + '.md')).exists():
        errors.append(f'Missing home route: {route}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'All 30 lesson routes, {len(links)} sidebar links, home routes, and local assets exist.')
