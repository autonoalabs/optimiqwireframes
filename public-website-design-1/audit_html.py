from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse,unquote
import json
ROOT=Path(__file__).parent
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__();self.path=path;self.ids=[];self.links=[];self.labels=[];self.h1=0;self.sources=[];self.feed(path.read_text(encoding='utf-8-sig'))
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='label' and 'for' in a:self.labels.append(a['for'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag in ('script','img') and a.get('src'):self.sources.append(a['src'])
  if tag=='link' and a.get('href'):self.sources.append(a['href'])
errors=[];pages={p.resolve():Page(p) for p in ROOT.rglob('*.html')}
for path,page in pages.items():
 if len(page.ids)!=len(set(page.ids)):errors.append(f'Duplicate IDs in {path.name}')
 if path.name=='index.html' and path.parent.name not in ('for-clients-form','for-consultants-form','for-consulting-firms-form') and page.h1!=1:errors.append(f'H1 count {page.h1}: {path}')
 for label in page.labels:
  if label not in page.ids:errors.append(f'Missing label target {label}: {path}')
 for link in page.links+page.sources:
  url=urlparse(link)
  if url.scheme or url.netloc:continue
  target=(path.parent/unquote(url.path)).resolve() if url.path else path
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'Missing link/asset {link}: {path}')
  elif url.fragment and target in pages and url.fragment not in pages[target].ids:errors.append(f'Missing anchor {link}: {path}')
for path in [ROOT/'index.html',*(ROOT/route/'index.html' for route in ['for-clients','for-consultants','for-consulting-firms'])]:
 text=path.read_text()
 if 'staging.optimiqconsultus.com' in text:errors.append(f'Legacy first-step link remains: {path}')
 if 'data-contact-form="guide"' in text:errors.append('Unapproved guide unexpectedly visible')
 if 'name="robots" content="noindex,nofollow"' not in text:errors.append(f'Missing preview noindex: {path}')
if errors:print('\n'.join(errors));raise SystemExit(1)
print(f'Passed {len(pages)} static pages: local links, image/script/font destinations, anchors, label targets, unique IDs, H1 counts, legacy-link exclusion, hidden guides and preview metadata.')
