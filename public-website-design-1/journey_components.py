"""Public website components for the v4.3 review build."""
from pathlib import Path
from html import escape
import json

ROOT=Path(__file__).resolve().parent
TOOLS={'client':('clients','Clients','project-cost','What Is Your Next Project Really Costing You?','Three questions. One clear number.'),
       'expert':('experts','Experts','expert-earnings','What Could Your Experience Earn You?','Four questions. Your upside, and where you could start.'),
       'firm':('firms','Firms','firm-growth','How Much Work Did Your Firm Miss Last Year?','Four questions. See what you could win back.')}
ROUTES={'client':'for-clients','expert':'for-consultants','firm':'for-consulting-firms'}
AUDIENCES={'client':'For organizations','expert':'For consultants and advisors','firm':'For consulting firms'}
SCENES={1:['1_1','2_1','1_2','3_1','1_3','2_3'],2:['2_1','1_4','1_2','3_2','2_1','2_2','2_2'],3:['1_3','1_4','1_3','3_3','2_3','3_1'],4:['1_4','4_1','2_4','3_4','2_4','3_4'],5:['1_1','1_2','1_3','2_3','2_3']}
MOTIFS={1:['paper','line','seal','network','seal','end'],2:['line','paper','seal','balance','line','shortlist','end'],3:['paper','paper','seal','network','seal','end'],4:['paper','shortlist','network','shortlist','balance','end'],5:['seal','paper','seal','network','end']}

def seo(route,title):
    descriptions={'':'Explore how OptimIQ connects organizations, verified consultants and consulting firms.',
     'certified':'Discover the four stages and levels of OptimIQ certification.','about':'Meet the thinking behind OptimIQ Consultus and explore its regional presence.',
     'contact':'Contact the OptimIQ team about a project, an application or a firm partnership.',
     'resources':'Try three interactive calculators and download a concept note for your audience.'}
    return descriptions.get(route,f'{title}. Explore this step of your OptimIQ Consultus journey.')

def note(a):
    return f'<button class="text-btn" data-note="@@ROOT@@assets/concept-notes-v43/OptimIQ_Concept_Note_{TOOLS[a][1]}.pdf">Download the concept note <small>PDF · 2 pages</small></button>'

def resource(a,with_tool=False):
    link=f'<a href="@@ROOT@@tools/{TOOLS[a][2]}/">Open calculator</a>' if with_tool else ''
    return f'<article class="resource-line"><div><p class="eyebrow">{AUDIENCES[a]}</p><h3>{TOOLS[a][3]}</h3></div><div>{link}{note(a)}</div></article>'

def tool(a,cta,route,standalone):
    kind,_,slug,title,intro=TOOLS[a]
    layout=json.loads((ROOT/'calculator-layouts.json').read_text(encoding='utf8'))[kind]
    share_href='@@ROOT@@tools/'+slug+'/'
    return f'''<section class="section workbench" id="calculator" data-tool="{a}"><div class="wrap"><div class="section-head"><p class="eyebrow">{AUDIENCES[a]} · Calculator</p><h2>{title}</h2><p>{intro}</p></div>{layout}<p id="live" class="sr-only" aria-live="polite"></p><p class="calc-disclaimer">Illustrative USD estimate. Assumptions are under review. Results are not a quote or guarantee. The supplied prototype formulas are visible in this review version.</p><div class="calc-links">{note(a)}<a href="{share_href}" data-share>Copy calculator link</a><span role="status" data-share-status aria-live="polite"></span></div></div></section>'''

def player(n,title):
    scenes=json.loads((ROOT/'film-scenes.json').read_text(encoding='utf8'))[str(n)]
    for i,scene in enumerate(scenes):
        scene.update(image=SCENES[n][i],motif=MOTIFS[n][i])
    encoded=escape(json.dumps(scenes,ensure_ascii=False),quote=True)
    art=scene['image']
    return f'''<div class="story-player" data-player data-scenes="{encoded}" data-root="@@ROOT@@" aria-label="{escape(title)} storyboard">
    <div class="screen" data-motif="{scenes[0]['motif']}">
      <img class="frame-art" src="@@ROOT@@assets/hero-images/{scenes[0]['image']}-800.webp" loading="lazy" alt="">
      <div class="film-matte"></div><div class="film-slate"><span>OPTIMIQ CONSULTUS</span><span>FILM {n:02d} · STORYBOARD</span></div>
      <div class="scene-geometry" aria-hidden="true">
        <div class="cv-sheet"><i></i><i></i><i></i><b></b></div>
        <div class="verified-card"><span>RESULTS</span><i></i><i></i><b>✓</b></div>
        <svg class="route-line" viewBox="0 0 240 120" focusable="false"><path d="M8 92h72c28 0 20-62 53-62h91"></path><circle cx="8" cy="92" r="5"></circle><circle cx="224" cy="30" r="5"></circle></svg>
        <div class="team-slots"><i></i><i></i><i></i><i></i></div>
        <div class="match-signal"><b>NEW PROJECT</b><span>Matched expertise</span></div>
      </div>
      <div class="intertitle"><span class="scene-kicker">A STORY IN PROOF</span><strong>{escape(scenes[0]['en'][0])}</strong></div>
      <span class="screen-time" aria-hidden="true">00:00</span>
    </div>
    <div class="transport">
      <button type="button" data-play aria-pressed="false">Play story</button>
      <label class="sr-only" for="seek-{n}">Story position</label>
      <input id="seek-{n}" type="range" min="0" max="{scenes[-1]['end']}" step=".1" value="0" data-seek>
      <output data-time>00:00 / {scenes[-1]['end']//60:02d}:{scenes[-1]['end']%60:02d}</output>
      <label class="sr-only" for="length-{n}">Story length</label>
      <select id="length-{n}" data-length><option value="full">Full story</option><option value="15">15-second teaser</option><option value="6">6-second bumper</option></select>
      <button type="button" data-lang aria-pressed="false">العربية</button>
    </div>
    <p class="story-caption" data-caption lang="en">{escape(scenes[0]['en'][1])}</p>
    <details class="transcript"><summary>Read transcript</summary><ol data-transcript></ol></details>
    <p class="fine story-status" data-status role="status">Illustrative storyboard. Final production film and approved captions are pending.</p>
  </div>'''

def leadership():
    return '<section class="section"><div class="wrap"><p class="eyebrow">Leadership</p><h2>The people behind OptimIQ.</h2><div class="leadership"><p><strong>Mizab Bhoje</strong><br>Founder &amp; Managing Partner</p><p>Strategic Advisors · Head of Delivery<br><small>Leadership roster, photographs and biographies await client confirmation.</small></p></div></div></section>'

extra_faq={'client':[('Is our information kept private?','Contact the team to discuss confidentiality and an NDA before sharing sensitive material.')], 'expert':[('How long does review take?','The team will confirm timing when your profile is complete.'),('Do I have to work only with OptimIQ?','Ask the team for the current engagement terms.'),('Is there a fee to apply?','Contact the team to confirm the applicable terms before applying.')], 'firm':[('Is there a fee to partner?','The partnerships team will confirm the terms for your firm.')]}
