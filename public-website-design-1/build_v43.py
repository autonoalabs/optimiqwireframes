"""Client-review public website; supplied v4.3 copy + supplied brand-kit assets.
No lead storage, verification, benchmark model or certification engine is implemented.
Run python build_v43.py to regenerate this review revision.
This generator uses the standard library and the supplied local assets only.
"""
from pathlib import Path
from html import escape as esc
import json, shutil

HERE=Path(__file__).resolve().parent
ROOT=HERE
ROOT.mkdir(parents=True,exist_ok=True)
BRAND=ROOT/'assets'/'brand'; BRAND.mkdir(parents=True,exist_ok=True)
# Client marks have already been extracted to assets/brand.

V='brand-v43-feedback-20261114'
AREAS=[('Strategy & Growth','Transformation · Go-to-market · Operational excellence'),('Revenue Enhancement','Business development · Marketing · Sales'),('Customer & Market Experience','Customer journeys · Brand · CX'),('Digital Transformation','Cybersecurity · Cloud · Data & analytics'),('AI & Emerging Tech','GenAI integration · Automation · Machine learning'),('Supply Chain & ESG','Sustainable sourcing · Logistics · ESG compliance'),('Finance & Operations','FP&A · Legal compliance · Process improvement'),('Talent & Manpower','High-volume sourcing · Mobilization · Executive search'),('People, L&D & Culture','Corporate training · Leadership coaching · Change')]
PATHS={'client':'for-clients','expert':'for-consultants','firm':'for-consulting-firms'}
CTA={'client':'Share Your Requirement','expert':'Apply in 2 Minutes','firm':'Register Your Firm'}
FORM={a:'../'+route+'-form/' for a,route in PATHS.items()}
PENDING=[]
def button(label,href,secondary=False):
    return f'<a class="btn{ " secondary" if secondary else ""}" href="{esc(href,quote=True)}">{esc(label)}<span aria-hidden="true">↗</span></a>'
def wordmark(): return '<span class="wordmark">Optim<span>IQ</span><small>Consultus</small></span>'
def logo(pre,light=False): return f'<a class="brand" href="{pre}index.html" aria-label="OptimIQ Consultus home"><img src="{pre}assets/brand/mark-{ "light" if light else "dark"}.png" width="64" height="64" alt="">{wordmark()}</a>'
def header(pre,active):
    nav=[('index.html','Home'),('for-clients/','For clients'),('for-consultants/','For consultants'),('for-consulting-firms/','For consulting firms'),('certified/','OptimIQ Certified'),('about/','About')]
    links=''.join(f'<a href="{pre}{href}"{ " aria-current=\"page\"" if active==label else ""}>{label}</a>' for href,label in nav)
    choices=''.join(f'<a href="{pre}{path}/#registration">{label}</a>' for path,label in [('for-clients','I need an expert'),('for-consultants',"I’m a consultant"),('for-consulting-firms','I run a consulting firm')])
    return f'''<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="nav-wrap"><button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button>{logo(pre)}<nav id="site-nav" aria-label="Main navigation">{links}<a href="{pre}../OptimIQ_Portal_Login_Concept.html">Member login</a></nav><div class="start"><button aria-expanded="false" aria-controls="start-menu">Get started <span aria-hidden="true">⌄</span></button><div id="start-menu" hidden>{choices}</div></div></div></header>'''
def footer(pre):
    return f'''<footer><div class="wrap footer-grid"><div>{logo(pre)}<p class="tagline">Global Expertise | Connected Impact | Optimized Results.</p></div><div><h2>Find your path</h2><a href="{pre}for-clients/">For clients</a><a href="{pre}for-consultants/">For consultants</a><a href="{pre}for-consulting-firms/">For consulting firms</a></div><div><h2>OptimIQ</h2><a href="{pre}certified/">OptimIQ Certified</a><a href="{pre}about/">About</a><a href="{pre}contact/">Contact</a><a href="{pre}../OptimIQ_Portal_Login_Concept.html">Member login</a></div><div><h2>Get in touch</h2><a href="mailto:solutions@optimiqconsultus.com">solutions@optimiqconsultus.com</a><a href="mailto:joinus@optimiqconsultus.com">joinus@optimiqconsultus.com</a><a href="tel:+919168772020">+91 9168772020</a><p>India · UAE · Saudi Arabia</p></div></div><div class="wrap footer-bottom"><span>© 2026 OptimIQ Consultus</span><div><a href="{pre}privacy/">Privacy</a><a href="{pre}terms/">Terms</a><a href="{pre}cookies/">Cookies</a></div></div></footer>'''
def download_dialog():
    return '''<dialog id="download-dialog" aria-labelledby="download-title"><button class="dialog-close" aria-label="Close download">×</button><p class="eyebrow">Concept note</p><h2 id="download-title">Get the full picture.</h2><form data-download-form><label class="download-label">Email address<input type="email" name="email" required autocomplete="email" maxlength="254" placeholder="you@company.com"></label><p class="fine">Preview only. Your email is not sent or saved.</p><button class="btn" type="submit">Download the PDF <span aria-hidden="true">↓</span></button><p class="form-status" role="status"></p></form></dialog>'''
def page(route,title,body,active='',description='OptimIQ Consultus. Global Expertise | Connected Impact | Optimized Results.'):
    pre='../' if route else ''
    html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="{esc(description)}"><title>{esc(title)} | OptimIQ Consultus</title><link rel="icon" type="image/png" sizes="32x32" href="{pre}assets/brand/favicon-32.png"><link rel="stylesheet" href="{pre}v43.css?v={V}"><script defer src="{pre}v43.js?v={V}"></script></head><body>{header(pre,active)}<main id="main">{body}</main>{footer(pre)}<dialog id="asset-dialog" aria-labelledby="asset-title"><button class="dialog-close" aria-label="Close">×</button><p class="eyebrow">Client preview</p><h2 id="asset-title">Asset awaiting delivery</h2><p id="asset-message"></p><button class="btn dialog-close">Close</button></dialog></body></html>'''
    html=html.replace('</body>',download_dialog()+'</body>')
    out=ROOT/route/'index.html' if route else ROOT/'index.html';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(html,encoding='utf8')
def section(title,inner,eyebrow='',kind=''):
    tag='h1' if kind=='page-hero' else 'h2'
    return f'<section class="section {kind}"><div class="wrap"><div class="section-head">{f"<p class=eyebrow>{esc(eyebrow)}</p>" if eyebrow else ""}<{tag}>{esc(title)}</{tag}></div>{inner}</div></section>'
def cards(items,cls='cards'):
    return f'<div class="{cls}">'+''.join(f'<article><span class="item-no">{i+1:02d}</span><h3>{esc(a)}</h3><p>{esc(b)}</p></article>' for i,(a,b) in enumerate(items))+'</div>'
def steps(title,items):return section(title,cards(items,'steps'))
def film(title,number,points=None,cta=None):
    action=f'<button class="film" data-asset="Film {number}, captions and approved English/Arabic versions are awaiting client delivery." aria-label="Preview film: {esc(title)}"><span class="play" aria-hidden="true">▷</span><span>Film {number:02d}</span><strong>{esc(title)}</strong><small>Film awaiting delivery</small></button>'
    inner=action
    if points: inner=f'<div class="film-layout">{action}<div class="takeaways"><ul>'+''.join(f'<li>{esc(t)}</li>' for t in points)+f'</ul>{cta or ""}</div></div>'
    return f'<section class="section film-section" id="film"><div class="wrap"><div class="section-head"><p class="eyebrow">Watch the story</p><h2>{esc(title)}</h2></div>{inner}</div></section>'
def doors(pre=''):
    data=[('Organizations','Proven experts, without big-firm overhead.','Find Your Expert','for-clients'),('Consultants & Advisors','Better projects. A clear path up.','Join the Network','for-consultants'),('Consulting Firms','More clients. Extra experts when needed.','Partner With Us','for-consulting-firms')]
    return '<div class="doors">'+''.join(f'<article><span class="item-no">0{i+1}</span><h3>{a}</h3><p>{b}</p>{button(c,pre+d+"/")}</article>' for i,(a,b,c,d) in enumerate(data))+'</div>'
VISUALS={
 'home': ['A glossy CV dissolves; a plain profile with a verified seal stays.', 'Leaders in a Riyadh boardroom review three verified profiles.', 'A phone lights up: “New project match”.', 'A small team grid expands as verified profiles slot in.'],
 'client':['A stack of glossy CVs; one verified card slides forward.', 'A short form turns into three matched profile cards.', 'A fee bar shrinks as brand and overhead blocks fall away.'],
 'expert':['A CV where the big logo blurs and the results sharpen.', 'Three professionals walk toward one gateway.', 'Map pins light up across the GCC and beyond.'],
 'firm':['Two proposals; the big logo gets picked up.', 'Client mandates flow along a line into the firm.', 'Verified profiles slot into the firm’s team grid.']
}
def visual_placeholder(description,index=0):
    return f'<div class="visual-placeholder" data-visual="{index}"{ " hidden" if index else ""}><div class="visual-frame" aria-hidden="true"><svg viewBox="0 0 80 64" fill="none"><rect x="1" y="1" width="78" height="62" rx="5"/><circle cx="24" cy="21" r="7"/><path d="m5 57 22-20 15 12 12-20 21 28"/></svg></div><span class="placeholder-label">Visual placeholder · {index+1:02d}</span><p>{esc(description)}</p><small>Blueprint visual · final asset pending</small></div>'
def carousel(slides,pre='',home=False,audience=None):
    panels=''.join(f'<div class="slide" data-slide="{i}"{ " hidden" if i else ""}><p class="eyebrow">{esc(a)}</p><h1>{esc(b)}</h1><p class="hero-copy">{esc(c)}</p>{button(d,h)}</div>' for i,(a,b,c,d,h) in enumerate(slides))
    tabs=''.join(f'<button type="button" data-go="{i}" aria-pressed="{str(i==0).lower()}"><span>{i+1:02d}</span> {esc(v[0].title())}</button>' for i,v in enumerate(slides))
    visuals=''.join(visual_placeholder(t,i) for i,t in enumerate(VISUALS['home' if home else audience]))
    return f'<section class="hero" data-carousel><div class="wrap hero-grid"><div class="hero-content">{panels}<div class="slide-controls" aria-label="Hero slides">{tabs}</div><p class="sr-only" data-slide-status aria-live="polite">Slide 1 of {len(slides)}</p></div><div class="hero-visuals">{visuals}</div></div></section>'
def expertise():
    return section('Nine Areas. One Clear Result.','<div class="expertise-grid">'+''.join(f'<details><summary>{esc(a)}</summary><p>{esc(b)}</p></details>' for a,b in AREAS)+'</div>')
def comparison():
    def icon(index):
        paths=['<circle cx="8" cy="8" r="3"/><circle cx="18" cy="8" r="3"/><path d="M2 23v-3a6 6 0 0 1 12 0v3m2-9a6 6 0 0 1 8 6v3"/>','<path d="M6 2h10l6 6v18H6zM16 2v7h6M10 14h8m-8 5h8"/>','<path d="M3 4h22v16H13l-6 5v-5H3zM8 10h12m-12 5h8"/>']
        return '<svg viewBox="0 0 28 28" fill="none" aria-hidden="true">'+paths[index]+'</svg>'
    left=''.join(f'<li><span class="comparison-icon">{icon(i)}</span><span>{t}</span><small>{i+1:02d}</small></li>' for i,t in enumerate(['A friend’s referral','A nice-looking CV','One good meeting']))
    right=''.join(f'<li><span class="comparison-check" aria-hidden="true">✓</span><span>{t}</span><small>{i+1:02d}</small></li>' for i,t in enumerate(['Verified knowledge','Tested behaviour','Confirmed client results']))
    return '<div class="proof-comparison"><article class="comparison-before"><div class="comparison-heading"><span class="eyebrow">Today</span><span class="comparison-label">The usual signals</span></div><ul>'+left+'</ul><div class="comparison-result"><span aria-hidden="true">↘</span> Costly mismatch</div></article><span class="comparison-connector" aria-hidden="true">→</span><article class="comparison-after"><div class="comparison-heading"><span class="eyebrow">With OptimIQ</span><span class="comparison-label">Evidence first</span></div><ul>'+right+'</ul><div class="comparison-result"><span aria-hidden="true">✓</span> Confident hire</div></article></div>'
def career():return cards([('Associate','Trusted client work'),('Professional','Leads workstreams'),('Senior Practitioner','High-stakes projects'),('Principal','Highest trust')],'career')+'<p class="fine center">Delivered results move you up. Actual certification follows evaluation.</p>'
def guide(a):
    names={'client':'Client Guide','expert':"Professional’s Guide",'firm':'Firm Partnership Guide'}
    return section('Want the full picture?',f'<div class="guide"><div><p>{ {"client":"Pricing models, how matching works and a worked cost example.","expert":"Each step, what to prepare, and the career levels.","firm":"Tiers, shared experts and how we work together."}[a]}</p></div><button class="btn secondary" data-asset="The {names[a]} (8–12 pages) is awaiting the final approved file. The supplied two-page concept note is a separate document.">Download the {names[a]} <span aria-hidden="true">↓</span></button></div>',kind='mist')
def field(name,label,kind='text',required=False,options=None,wide=False,autocomplete=None):
    ident='field-'+name
    mark=' <span aria-hidden="true">*</span>' if required else ''
    attrs=f' id="{ident}" name="{name}"'+(' required' if required else '')+(f' autocomplete="{autocomplete}"' if autocomplete else '')
    if options:
        control=f'<select{attrs}><option value="">Select one</option>'+''.join(f'<option>{esc(x)}</option>' for x in options)+'</select>'
    elif kind=='textarea':control=f'<textarea{attrs} rows="4" maxlength="2000"></textarea>'
    elif kind=='file':control=f'<input{attrs} type="file" accept=".pdf,.doc,.docx">'
    else:control=f'<input{attrs} type="{kind}"'+(' maxlength="254"' if kind=='email' else ' maxlength="160"')+'>'
    return f'<div class="form-field{ " full" if wide else ""}"><label for="{ident}">{esc(label)}{mark}</label>{control}</div>'
def registration(a):
    required=True
    if a=='client':
        fields=field('full_name','Full name',required=True,autocomplete='name')+field('email','Work email','email',True,autocomplete='email')+field('phone','Phone / WhatsApp','tel',True,autocomplete='tel')+field('organization','Organization',required=True,autocomplete='organization')+field('need','I need',required=True,options=['A Consultant','A Strategic Advisor','A Project Manager','Not sure yet'])+field('area','Area',options=[x[0] for x in AREAS])+field('challenge','What do you want to solve?','textarea',wide=True)
        submit='Share Your Requirement';intro='Tell us what you need.'
    elif a=='expert':
        fields=field('role',"I’m applying as",required=True,options=['Consultant','Strategic Advisor','Project Manager'],wide=True)+field('full_name','Full name',required=True,autocomplete='name')+field('email','Work email','email',True,autocomplete='email')+field('phone','Phone / WhatsApp','tel',True,autocomplete='tel')+field('area','Main area',required=True,options=[x[0] for x in AREAS])+field('experience','Years of experience',required=True,options=['5–10','10–15','15–20','20+'],wide=True)
        fields+='<fieldset class="evidence-inputs full"><legend>LinkedIn or CV <span aria-hidden="true">*</span></legend><p>Provide either your LinkedIn profile or your CV.</p><div class="form-grid">'+field('linkedin','LinkedIn profile','url')+field('cv','Upload CV','file')+'</div><p class="evidence-error" role="alert" hidden>Add a LinkedIn profile or choose your CV to continue.</p></fieldset>'
        submit='Start My Application';intro='Finish your full profile later, at your own pace.'
    else:
        fields=field('firm_name','Firm name',required=True,autocomplete='organization')+field('representative','Your name & title',required=True)+field('email','Email','email',True,autocomplete='email')+field('phone','Phone / WhatsApp','tel',True,autocomplete='tel')+field('need','What do you need?',required=True,options=['New clients','Extra capacity','Both'])+field('area','Main area',options=[x[0] for x in AREAS])+field('firm_size','Firm size',options=['1–10','11–50','51–100','101–200','200+'],wide=True)+field('notes','Anything else?','textarea',wide=True)
        submit='Register Your Firm';intro='About a minute.'
    destination='../thank-you-'+('consultant' if a=='expert' else a)+'/?preview=1'
    return f'<section class="section registration" id="registration"><div class="wrap"><div class="registration-layout"><div class="registration-intro"><p class="eyebrow">Your next step</p><h2>{esc(CTA[a])}</h2><p class="reg-copy">{intro}</p><div class="registration-note"><span aria-hidden="true">↗</span><p>Complete the short form. Your full profile comes next.</p></div><p class="fine">Already registered? <a href="../../OptimIQ_Portal_Login_Concept.html?audience={ {"expert":"consultant","firm":"firm","client":"client"}[a]}">Member login</a></p></div><form class="registration-form" data-registration="{a}" data-next="{destination}"><div class="form-grid">{fields}</div><p class="form-preview-note">Preview only. Information is not submitted or saved; no account is created.</p><button class="btn" type="submit">{submit} <span aria-hidden="true">↗</span></button></form></div></div></section>'
def faqs(items):
    return section('Your questions, answered.','<div class="faqs">'+''.join(f'<details><summary>{esc(q)}</summary><p>{esc(ans)}</p></details>' for q,ans in items)+'</div>')
def calculator(a,standalone=False):
    examples={'client':('What Is Your Next Project Really Costing You?',[('Planned consulting budget','$500,000'),('Who would you normally hire?','Big-name global firm'),('What kind of project?','Transformation')],'$180K – $240K','value you could keep on this project'), 'expert':('What Could Your Experience Earn You?',[('What do you do?','Consultant'),('Years of experience','12'),('Days billed last year','90'),('Your day rate','$750')],'+$30K – $40K','a year you could add'), 'firm':('How Much Work Did Your Firm Miss Last Year?',[('Practitioners in your firm','25'),('Projects lost or turned down','8'),('Why they slipped away','A mix of both'),('Typical project value','$250,000')],'$700K – $1M','a year you could win back')}
    title,fields,value,caption=examples[a]
    fieldhtml=''.join(f'<div class="sample-field"><span>{esc(k)}</span><strong>{esc(v)}</strong></div>' for k,v in fields)
    note_button='<button class="text-btn" data-asset="The Client concept note awaits confirmation of which cost components may be disclosed publicly.">Get the Concept Note <span aria-hidden="true">↓</span></button>' if a=='client' else f'<button class="text-btn" data-note="../assets/concept-notes-v43/OptimIQ_Concept_Note_{ "Experts" if a=="expert" else "Firms"}.pdf">Get the Concept Note <span aria-hidden="true">↓</span></button>'
    inner=f'<div class="calc-grid"><div><p class="eyebrow">Illustrative example</p>{fieldhtml}<p class="fine">This supplied example is fixed for review. Live estimates await approved assumptions and a private calculation service.</p></div><div class="calc-result"><span class="result-label">WITH OPTIMIQ</span><p class="result-number">{value}</p><p>{caption}</p><div class="result-chart" aria-hidden="true"><span>Today</span><div class="bar today"></div><span>With OptimIQ</span><div class="bar future"></div></div><p class="fine">Illustrative range. Not a quote or guarantee.</p>{button(CTA[a],("../"+PATHS[a]+"/#registration") if standalone else "#registration")}</div></div><div class="calc-bottom"><button class="text-btn" data-asset="The supplied concept note needs the new branding and approved public disclosure wording before this download is released.">Get the Concept Note <span aria-hidden="true">↓</span></button><a class="text-btn" href="{ "../" if standalone else "../"}contact/">Talk to our team ↗</a></div>'
    inner=inner.replace('<button class="text-btn" data-asset="The supplied concept note needs the new branding and approved public disclosure wording before this download is released.">Get the Concept Note <span aria-hidden="true">↓</span></button>',note_button)
    return f'<section class="section mist" id="calculator"><div class="wrap"><div class="section-head"><p class="eyebrow">Explore your potential</p><h2>{title}</h2></div><div class="calculator">{inner}</div></div></section>'

home_slides=[('OPTIMIQ','Proven, Not Polished.','Real results beat a nice-looking CV. Every time.','Watch the Film','#film'),('CLIENTS','The Right Expert. Without the Big-Firm Bill.','Seasoned consultants, advisors and project managers, already verified.','Find Your Expert','for-clients/'),('EXPERTS','Your Results Speak First.','Better projects. Global clients. A clear path up.','Apply in 2 Minutes','for-consultants/#registration'),('FIRMS','Grow Bigger. Without Hiring More.','The right clients, and verified experts when you need them.','Register Your Firm','for-consulting-firms/#registration')]
body=carousel(home_slides,home=True)
body+=film('Why Results Beat Nice CVs.',1)
body+=section('Most Experts Are Chosen on Too Little Proof.',comparison())
body+=section('Every Expert Passes Three Checks.',cards([('Knowledge','Confirmed, not assumed'),('Behaviour','How they actually work with clients'),('Judgement','Tested, not claimed')])+'<div class="section-tail"><p>Technology organises the evidence. Experienced people make the final call.</p><a href="certified/">How certification works ↗</a></div>',kind='mist')
body+=section('Where Do You Fit?',doors(),eyebrow='Three paths. One standard.')
body+=expertise()
body+=section('We Verify the Talent. You Get the Result.','<div class="actions">'+button('Find an Expert','for-clients/#registration')+button('Apply as a Consultant','for-consultants/#registration',True)+button('Register Your Firm','for-consulting-firms/#registration',True)+'</div>',kind='closing')
page('','Proven, Not Polished.',body,'Home')

slides={
'client':[('THE PROBLEM','Great CV. Wrong Fit?','Anyone can write a great CV. Results are harder to fake.','See How We Fix It','#film'),('THE FIX','Proven Before You Meet Them.',"Every expert is checked on what they’ve actually delivered.",CTA['client'],'#registration'),('THE PROOF','Pay for Expertise, Not the Logo.','Senior talent without big-firm overhead.','See What You Could Keep','#calculator')],
'expert':[('THE PROBLEM','Great Work. Not Enough Projects?','Too often, a famous logo beats real results.','See How That Changes','#film'),('THE FIX','Your Results Speak First.','Global firm, small firm or independent: one standard for all.',CTA['expert'],'#registration'),('THE REWARD','Better Projects. Global Clients. A Clear Path Up.','Work with international experts and grow from Associate upward.','See What You Could Earn','#calculator')],
'firm':[('THE PROBLEM','Lost the Bid to a Bigger Name?','Clients often pick the logo before comparing delivery.','See How to Change That','#film'),('THE FIX','More of the Right Clients and Projects.','We bring you projects that fit your strengths.',CTA['firm'],'#registration'),('THE SCALE','Team Full? Say Yes Anyway.','Add verified experts when you need them. No fixed cost.',"See What You’re Missing",'#calculator')]}
for a in PATHS:
    b=carousel(slides[a],pre='../',audience=a)
    b+=film({'client':"What If Your Next Project Couldn’t Fail?",'expert':'Can You Prove It?','firm':'Grow Bigger. Without Hiring More.'}[a],{'client':2,'expert':3,'firm':4}[a],{'client':['Experts verified on real delivery','No big-firm overhead','One accountable lead, your terms'],'expert':['Judged on results, not logos','A steady flow of better projects','A clear career path, global teams'],'firm':['Better clients and projects','Extra experts when needed','Your brand stays yours']}[a],button(CTA[a],'#registration'))
    if a=='client':
        b+=section('Pay for Expertise, Not Overhead.','<div class="team-compare"><article><p class="eyebrow">Traditional firm</p><div class="team-icons" aria-label="Six international specialists">'+''.join('<span>↗</span>' for _ in range(6))+'</div><p>Every seat at international rates, plus travel & accommodation</p></article><article><p class="eyebrow">OptimIQ team</p><div class="team-icons">'+''.join(f'<span class="{ "local" if i<4 else ""}">{ "●" if i<4 else "↗"}</span>' for i in range(6))+'</div><p>International rates only where the expertise is genuinely needed</p><small>● Local consultant &nbsp; ↗ International specialist</small></article></div><p class="fine center">Illustrative team of six</p>')
        b+=calculator(a)+steps('Four Simple Steps.',[('Share your need','About 2 minutes'),('Meet verified experts','A matched shortlist'),('Agree terms','Project · retainer · success fee'),('Deliver','One accountable lead')])
        b+=expertise()
        faq=[('How do you check your experts?','On real experience and results, confirmed with past clients. See OptimIQ Certified.'),('How do you charge?','Project, retainer or success fee, agreed upfront.')]
    elif a=='expert':
        b+=section('What Do You Do?','<div class="doors">'+''.join(f'<article><h3>{r}</h3><p>{t}</p>{f'<a class="btn" href="#registration" data-select-role="{r}">{l}<span aria-hidden="true">↗</span></a>'}</article>' for r,t,l in [('Consultant','Solve real problems.','Apply as a Consultant'),('Strategic Advisor','Guide big decisions.','Apply as an Advisor'),('Project Manager','Own the delivery.','Apply as a PM')])+'</div>')
        b+=steps('Five Steps. Save and Resume Anytime.',[('Apply','2 minutes'),('Build profile','At your pace'),('Talk to us','A short call'),('Review','Real people check'),('Your result','See your level')])+calculator(a)+section('A Clear Path Up.',career())
        faq=[('Can I apply without a big-firm background?','Yes. The same standard applies to everyone.'),('How do I get paid?','By project, retainer or success fee.')]
    else:
        b+=section('How OptimIQ Clears the Way.','<div class="challenge-list">'+''.join(f'<div><span>{q}</span><span aria-hidden="true">→</span><strong>{r}</strong></div>' for q,r in [('Bigger names win the bid','Win on proof, not logos'),('Good work never reaches you','Matched client projects'),('The project is too big for your team','Extra verified experts, when needed'),('Partners take your clients','Your brand and clients stay yours')])+'</div>')
        b+=calculator(a)+steps('Four Simple Steps.',[('Register','Your firm and team'),('Certify','Your practitioners'),('Get matched','Client projects'),('Deliver & grow','Move up a tier')])
        b+=section('More Clients. More Capacity. More Growth.',cards([('More demand','Selected client mandates'),('Certified capacity','Your team + OptimIQ’s bench'),('Bigger programmes','Larger, multi-year mandates')])+'<p class="fine center">More revenue. Sharper delivery. A stronger position.</p>',kind='mist')
        faq=[('Do we keep our brand and clients?','Yes. Always.'),('How are projects matched?','By your specialism, capacity and the client’s need.'),('Can our consultants be certified?','Your internal or dedicated professionals can be certified and linked to your firm. External deployment requires your firm’s permission.')]
    b+=registration(a)+faqs(faq)+guide(a)
    page(PATHS[a],{'client':'For Clients','expert':'For Consultants','firm':'For Consulting Firms'}[a],b,{'client':'For clients','expert':'For consultants','firm':'For consulting firms'}[a])
    page(PATHS[a]+'-form',CTA[a],registration(a).replace('<h2>','<h1>',1).replace('</h2>','</h1>',1))
    calc_title={'client':'Project Value Calculator','expert':'Experience Earnings Calculator','firm':'Firm Opportunity Calculator'}[a]
    page('calculator-'+a,calc_title,calculator(a,True).replace('<h2>','<h1>',1).replace('</h2>','</h1>',1))

cert=section('OptimIQ Certified. Earned, Not Claimed.','<p class="hero-copy">Built on real projects, real results and real client feedback.</p><div class="actions">'+button('Begin Your Certification','../for-consultants/#registration')+button('Hire Certified Talent','../for-clients/#registration',True)+'</div>',eyebrow='OptimIQ Certified',kind='page-hero')
cert+=film('Not Everyone Gets This.',5)+section('What We Examine.',cards([('Knowledge','Real skill in the field'),('Behavior','Calm under pressure'),('Stakeholders','Handles people well'),('Outcomes','Sees work through')]))
cert+=steps('Strict. Fair. No Shortcuts.',[('Prove your fit','Credentials checked'),('Show your work','Real case evidence'),('Confirm impact','We call past clients'),('Earn your level','Panel review')])+section('Four Levels. One Standard.',career(),kind='mist')
cert+=section('Who Can Apply.',cards([('Who can apply','Consultants, Advisors and PMs with real experience.'),('What we ask','A profile, a CV and a short intro.'),('What happens next','Review, a short call, your result.'),('Staying certified','Kept current by client feedback.')]))+section('Ready to Prove What You Can Do?','<div class="actions">'+button('Begin Your Certification','../for-consultants/#registration')+button('Talk to Our Team','../contact/',True)+'</div>',kind='closing')
page('certified','OptimIQ Certified',cert,'OptimIQ Certified')
about=section('Built for Decisions That Matter.','<p class="hero-copy">The right expert shapes what comes next.</p>'+button('Find Your Path','#paths'),eyebrow='About OptimIQ',kind='page-hero')
about+=section('We Built OptimIQ So Proof Comes First.','<div class="story"><p>Too many experts are still chosen on a CV, a referral or one good meeting. Great professionals and firms get missed for lack of a famous name.</p><p>We built OptimIQ so proof comes first, for everyone.</p></div>')+film('Why Results Beat Nice CVs.',1)
about+=section('Proof Beats Guessing.',cards([('Trusted','Not the biggest network. The most trusted.'),('Local and global','GCC know-how with international reach.'),('Transparent','Clear prices, process and expectations.')]),kind='mist')
about+=section('Our Presence.','<div class="presence"><span>India</span><span>UAE</span><span>Saudi Arabia</span></div>')+f'<section class="section" id="paths"><div class="wrap"><h2>Find Your Path.</h2>{doors("../")}</div></section>'
page('about','About',about,'About')

contact=section('Not Sure Where to Start? Start Here.',doors('../'),eyebrow='Contact',kind='page-hero')
contact+=section('Send Us a Message.','''<form class="contact-form" data-demo-form><div class="form-grid"><label>Full name <span>*</span><input name="name" autocomplete="name" required maxlength="120"></label><label>Email <span>*</span><input name="email" type="email" autocomplete="email" required maxlength="254"></label><label>Phone / WhatsApp<input name="phone" type="tel" autocomplete="tel" maxlength="30"></label><label>I am a <span>*</span><select name="audience" required><option value="">Select one</option><option>Client</option><option>Consultant</option><option>Firm</option><option>Other</option></select></label><label class="full">Message <span>*</span><textarea name="message" required rows="4" maxlength="2000"></textarea></label></div><p class="fine">Preview only. No information is sent or saved.</p><button class="btn" type="submit">Send Message <span aria-hidden="true">↗</span></button><p class="form-status" role="status"></p></form>''')
contact+=section('Talk to Our Team.','<div class="direct"><a href="mailto:solutions@optimiqconsultus.com"><small>Clients</small>solutions@optimiqconsultus.com ↗</a><a href="mailto:joinus@optimiqconsultus.com"><small>Professionals</small>joinus@optimiqconsultus.com ↗</a><a href="tel:+919168772020"><small>Phone</small>+91 9168772020 ↗</a></div><div class="presence"><span>India</span><span>UAE</span><span>Saudi Arabia</span></div>',kind='mist')
page('contact','Contact',contact)
for a in PATHS:
    label={'client':'Thank You. We’re On It.','expert':'You’re In. Check Your Email and Phone.','firm':'Thank You. Let’s Grow Together.'}[a]
    page('thank-you-'+('consultant' if a=='expert' else a),'Thank You',section(label,'<p class="hero-copy">Preview form completed. Your information was not submitted or saved and no account was created. Email/WhatsApp verification and portal handoff await the approved implementation.</p><div class="actions">'+button('Member login','../../OptimIQ_Portal_Login_Concept.html')+button('Back to your journey','../'+PATHS[a]+'/',True)+'</div>',kind='page-hero'))
for route,title in [('privacy','Privacy'),('terms','Terms'),('cookies','Cookies')]:
    page(route,title,section(title,'<p class="hero-copy">The final policy text is awaiting client approval.</p>'+button('Contact our team','../contact/'),kind='page-hero'))

review_rows=[('Home','index.html','Ready for review · film pending'),('For clients','for-clients/','Updated preview · local form included'),('Client registration','for-clients-form/','Preview form · verification needs clarification'),('For consultants','for-consultants/','Updated preview · local form included'),('Consultant application','for-consultants-form/','Preview form · verification needs clarification'),('For consulting firms','for-consulting-firms/','Updated preview · local form included'),('Firm registration','for-consulting-firms-form/','Preview form · verification needs clarification'),('OptimIQ Certified','certified/','Ready for review · framework ratification pending'),('About','about/','Ready for review · leadership assets pending'),('Contact','contact/','Ready for review · message service pending')]
review_rows += [(f'{a.title()} calculator','calculator-'+a+'/','Fixed example · live model approval pending') for a in PATHS]
review_rows += [(f'{a.title()} thank-you','thank-you-'+('consultant' if a=='expert' else a)+'/','Design placeholder · verification/next steps pending') for a in PATHS]
review_rows += [(t,r+'/','Policy wording pending') for r,t in [('privacy','Privacy'),('terms','Terms'),('cookies','Cookies')]]
rows=''.join(f'<a class="review-row" href="{href}"><strong>{name}</strong><span>{status}</span><b aria-hidden="true">↗</b></a>' for name,href,status in review_rows)
review=section('Public Website Review.','<p class="hero-copy">Blueprint v4.3 · Client brand kit · 14 November 2026</p><p class="review-note">Updated screens are awaiting client feedback. Prior Design 1 approval does not approve this revision.</p><div class="review-list">'+rows+'</div><h2 class="review-subhead">What remains open</h2><p>Registration and verification details; calculator approval and result disclosure; certification policy; films, captions, guides and concept-note refresh; Arabic copy; legal and organisation details. The clarification Excel is supplied separately to the client.</p><div class="actions">'+button('All portal screens','../index.html',True)+'</div>',kind='page-hero')
page('','Proven, Not Polished.',body,'Home')
(ROOT/'review.html').write_text((lambda h:h)(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Website client review | OptimIQ</title><link rel="stylesheet" href="v43.css?v={V}"></head><body>{header("","")}<main id="main">{review}</main>{footer("")}<script src="v43.js?v={V}"></script></body></html>'),encoding='utf8')
(ROOT/'revision-status.json').write_text(json.dumps({'version':V,'status':'Awaiting client feedback','brand':'Client brand kit received 14 November 2026','pages':[{'name':n,'path':r,'status':s} for n,r,s in review_rows],'implementationLimits':['Static client preview','No lead storage or verification','No private calculator model included','No certification engine or scoring change','Existing portal and external staging site unchanged; local forms are preview simulators']},indent=2),encoding='utf8')
print('Built',len(review_rows)+1,'review screens')
