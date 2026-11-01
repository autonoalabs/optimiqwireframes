"""Rebrand the three client concept notes in the approved Design 1 system."""
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).parent/'python-libs'))
from xml.sax.saxutils import escape
import json, re, argparse
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from PIL import Image
from fontTools.ttLib import TTFont as Font
from fontTools.varLib.instancer import instantiateVariableFont
from pypdf import PdfReader

ROOT=Path(__file__).parent
args=argparse.ArgumentParser(description=__doc__)
args.add_argument('--output',default='output/pdf')
args=args.parse_args()
OUT=Path(args.output);OUT.mkdir(parents=True,exist_ok=True)
TMP=Path('tmp/pdfs/concept-notes');TMP.mkdir(parents=True,exist_ok=True)
SITE=ROOT/'site' if (ROOT/'site').exists() else ROOT.parent
ASSETS=SITE/'assets'
LOGO=SITE.parent/'public-website/assets/OptimIQ_Short_logo.png'
LOGO_IMAGE=ImageReader(Image.open(LOGO).convert('RGB').resize((180,180),Image.Resampling.LANCZOS))
for family,file,weights in [('Inter','Inter-Variable.ttf',[400,500,600]),('Jakarta','PlusJakartaSans-Variable.ttf',[600,700])]:
 for weight in weights:
  target=TMP/f'{family}-{weight}.ttf'
  if not target.exists():
   font=Font(ASSETS/file);instantiateVariableFont(font,{'wght':weight},inplace=True).save(target)
  pdfmetrics.registerFont(TTFont(f'{family}{weight}',str(target)))

GREEN='#0D5C3A';MINT='#10B981';SLATE='#0F172A';MUTED='#64748B';LINE='#CBD5E1';BG='#F8F9FA'
W,H=595.276,841.89;M=40;CW=W-2*M
DATA={
 'Clients':dict(audience='FOR CLIENTS',title='Keep the value.<br/>Lose the overhead.',intro='Seasoned, pre-verified consultants, strategic advisors and project managers for your projects, without the risk of the wrong expert or the cost of a big-firm brand.',problem='You often pay for the logo, and still carry the risk',problems=[('Every CV looks great','AI makes any profile shine. Big names on a CV say little about what the person delivered.'),('Fees carry overhead','Brand premium, partner layers and big-firm overhead sit inside the fee, not in the work.'),('Failure is expensive','The wrong expert costs the fee, the delay and the lost benefit of the project.')],calc='What is your next project really costing you?',calc_intro='Three questions, one answer: the value you could keep by engaging pre-verified experts directly.',answers=[('Planned consulting budget','$500K'),('Who you would normally engage','Big-name global firm'),('Kind of project','Transformation')],verdict='On a $500K project with a big-name global firm:',value='$180K - $240K',caption='value you could keep on this project',details=[('Overhead you stop paying','$120K - $160K'),('Value protected from delivery risk','$60K - $80K')],how='The right expert, verified before you meet them',steps=[('Tell us the project','Share the goal, timing and the expertise you need.'),('Meet verified experts','We shortlist seasoned experts proven on similar work.'),('Deliver with confidence','Work directly with the experts you chose, with OptimIQ alongside.')],benefit='Senior expertise, without the extras you never asked for',benefits=[('Proof, not polish','Every expert is evaluated on real delivery: the projects they have actually led and the outcomes they produced. Not AI-written CVs or famous employer names.'),('No big-firm overhead','You pay for expertise, not for a brand, partner layers or overhead.'),('Lower delivery risk','Experts who have done this kind of project before, and proved it.'),('The expert you met does the work','No hand-off to a junior team after the pitch.')],quote="Big names don't deliver projects. People do. We make sure they are the right people.",cta='Tell us about your project',cta_intro='We will come back with verified experts who fit it.',button='Tell Us About Your Project',route='for-clients',anchor='enquire',tool='fee-comparison'),
 'Experts':dict(audience='FOR CONSULTANTS, STRATEGIC ADVISORS AND PROJECT MANAGERS',title='Let your track record<br/>bring the work to you.',intro='A steady flow of better projects with clients in the region and worldwide, international experts to work alongside, and a clear career path from Associate upward.',problem='Great work, but a patchy pipeline',problems=[('Feast or famine','Every new project starts with a cold pitch, and the gaps between them cost you.'),('Polish beats proof','A buzzword-heavy profile too often wins over years of real results.'),('No clear way up','Independent work rarely comes with a path to grow, or people to learn from.')],calc='What could your experience earn you?',calc_intro='Four questions, one answer: what a steady flow of verified projects could add to your year, and where you could start.',answers=[('What you do','Consultant'),('Years of hands-on experience','12'),('Project days billed last year','90'),('Typical day rate','$750')],verdict='With 90 billed days last year:',value='+$30K - $40K',caption='a year you could add with OptimIQ projects',details=[('Extra project days a year','30 - 40'),('Where you could start','Senior Consultant')],how='Get verified once. Let your record do the talking',steps=[('Apply','Tell us what you have delivered and where you work best.'),('Get verified',"We evaluate your real experience, not your CV's polish."),('Get matched','Receive projects that fit your expertise, and grow from there.')],benefit='More of the work you are best at',benefits=[('A steady flow of projects','Matched to your verified expertise, so less time pitching.'),('Global clients','Projects with clients across the region and around the world.'),('International experts','Team up with and learn from experienced experts on real mandates.'),('A clear career path','Grow from Associate upward, on the strength of what you deliver.')],quote="Your results should open doors, not your last employer's name.",cta='Apply as an expert',cta_intro='Tell us what you have delivered. We will take it from there.',button='Apply as an Expert',route='for-consultants',anchor='apply',tool='earnings'),
 'Firms':dict(audience='FOR CONSULTING FIRMS',title='Grow your firm without<br/>growing your payroll.',intro='We partner with your firm on its growth: the right clients and projects on one side, pre-verified experts on demand on the other, with no fixed overhead.',problem='Good firms leave good work on the table',problems=[('Lost to bigger names','Some mandates go to the logo, before delivery is even compared.'),('Too big for the team','Others are declined because the team is already stretched.'),('Hiring is a fixed cost','Permanent hires carry cost long after the mandate ends.')],calc='How much work is your firm leaving on the table?',calc_intro='Four questions, one answer: what you could win back as an OptimIQ partner firm.',answers=[('Practitioners in your firm','25'),('Mandates lost or turned down last year','8'),('Why they slipped away','A mix of both'),('Typical mandate value','$250K')],verdict='Last year you left about $2M of mandates on the table.',value='$700K - $1M',caption='a year you could win back as an OptimIQ partner firm',details=[('Pre-qualified mandates to bid on','2 - 4 a year'),('Extra fixed payroll needed','$0')],how='A growth partner, not a competitor',steps=[('Register your firm','Tell us your strengths, sectors and team.'),('Get connected','Receive client mandates matched to what you do best.'),('Scale on demand','Add verified experts when a mandate needs them.')],benefit='More projects, more revenue, lower cost',benefits=[('The right clients and projects','Pre-qualified mandates matched to your strengths.'),('Verified experts on demand','Add capacity for a mandate, with no fixed payroll.'),('Win more bids','Bring proven, verified experts to your proposals.'),('Keep your brand','Your clients stay yours, and so does your way of working.')],quote='Say yes to the next big mandate, without carrying the cost when it ends.',cta='Register your firm',cta_intro='Our partnerships team will come back to you with next steps.',button='Register Your Firm',route='for-consulting-firms',anchor='partner',tool='missed-opportunities')
}
# Review PDF buttons use working review routes; regenerate with production base at launch.
BASE='https://autonoalabs.github.io/optimiqwireframes/public-website-design-1/'
checks=[]
def para(c,text,x,top,width,size=10,font='Inter400',color=SLATE,leading=None,maxheight=None,align=0):
 style=ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.45,textColor=HexColor(color),spaceAfter=0,alignment=align)
 p=Paragraph(text,style);_,h=p.wrap(width,800)
 if maxheight is not None and h>maxheight+.1:raise ValueError(f'Overflow {text[:50]}: {h}>{maxheight}')
 if top+h>H-24:raise ValueError(f'Page overflow: {text[:50]}')
 p.drawOn(c,x,H-top-h);return h
def box(c,x,top,width,height,fill='#FFFFFF',stroke=LINE,r=6):
 c.setFillColor(HexColor(fill));c.setStrokeColor(HexColor(stroke));c.setLineWidth(.6);c.roundRect(x,H-top-height,width,height,r,fill=1,stroke=1)
def line(c,x,top,width,color=LINE):
 c.setStrokeColor(HexColor(color));c.setLineWidth(.5);c.line(x,H-top,x+width,H-top)
def brand(c,top,dark=False):
 c.drawImage(LOGO_IMAGE,M,H-top-29,width=29,height=29,mask='auto')
 para(c,'OptimIQ',M+38,top-1,120,14,'Jakarta700',MINT if dark else GREEN)
 para(c,'Consultus',M+38,top+17,120,8.5,'Inter400','#FFFFFF' if dark else SLATE)
def footer(c,n):
 line(c,M,795,CW)
 para(c,'OptimIQ Consultus',M,804,180,7.5,'Inter600')
 para(c,'Proven, not polished.',235,804,180,7.5,'Inter400',MUTED)
 para(c,f'{n} / 2',W-M-25,804,25,7.5,'Inter400',MUTED)
def section(c,label,title,top,title_size=15):
 para(c,label,M,top,CW,8,'Inter600',GREEN,10)
 para(c,escape(title),M,top+17,CW,title_size,'Jakarta700',SLATE,20,maxheight=40)
def pdf(name,d):
 path=OUT/f'OptimIQ_Concept_Note_{name}.pdf'
 c=canvas.Canvas(str(path),pagesize=(W,H),pageCompression=1)
 c.setTitle(f'OptimIQ Consultus | {name} Concept Note');c.setAuthor('OptimIQ Consultus');c.setSubject('Concept note | Design 1')
 c.setFillColor(HexColor(BG));c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(HexColor(SLATE));c.rect(0,H-231,W,231,fill=1,stroke=0)
 c.setFillColor(HexColor(GREEN));c.rect(0,H-235,W,4,fill=1,stroke=0)
 brand(c,24,True)
 box(c,W-M-82,25,82,24,SLATE,'#64748B',12);para(c,'Concept note',W-M-70,31,64,7.5,'Inter400','#FFFFFF',10)
 para(c,d['audience'],M,76,CW,7.2,'Inter600',MINT,10,maxheight=20)
 para(c,d['title'],M,102,CW,26,'Jakarta700','#FFFFFF',30,maxheight=60)
 para(c,escape(d['intro']),M,175,CW,10,'Inter400','#FFFFFF',14,maxheight=42)
 section(c,'THE PROBLEM',d['problem'],258)
 gap=12;col=(CW-2*gap)/3
 for i,(title,text) in enumerate(d['problems']):
  x=M+i*(col+gap);box(c,x,305,col,119)
  para(c,f'0{i+1}',x+13,317,col-26,8,'Inter600',GREEN,11)
  ht=para(c,escape(title),x+13,338,col-26,10,'Jakarta700',SLATE,13,maxheight=26)
  para(c,escape(text),x+13,338+ht+7,col-26,8.6,'Inter400',MUTED,12,maxheight=424-(338+ht+7)-10)
 section(c,'THE CALCULATOR',d['calc'],446,14)
 para(c,escape(d['calc_intro']),M,489,CW,8.6,'Inter400',MUTED,12,maxheight=24)
 gap=14;panel=(CW-gap)/2;right=M+panel+gap;top=530;ph=206
 box(c,M,top,panel,ph);box(c,right,top,panel,ph,SLATE,SLATE)
 para(c,'EXAMPLE ANSWERS',M+15,top+16,panel-30,7.7,'Inter600',GREEN,11)
 for i,(label,value) in enumerate(d['answers']):
  y=top+45+i*35
  para(c,escape(label),M+15,y,panel-120,8.7,'Inter400',SLATE,11,maxheight=28)
  para(c,escape(value),M+panel-97,y,82,8.7,'Inter600',SLATE,11,maxheight=28)
  if i<len(d['answers'])-1:line(c,M+15,y+30,panel-30)
 y=top+15
 y+=para(c,escape(d['verdict']),right+15,y,panel-30,8.8,'Inter400','#FFFFFF',12,maxheight=36)+7
 y+=para(c,d['value'],right+15,y,panel-30,23,'Inter500',MINT,29,maxheight=29)
 y+=para(c,escape(d['caption']),right+15,y+1,panel-30,8.8,'Inter400','#FFFFFF',12,maxheight=36)+12
 line(c,right+15,y,panel-30,'#64748B');y+=10
 for label,value in d['details']:
  lh=para(c,escape(label),right+15,y,panel-135,8.4,'Inter400','#FFFFFF',11,maxheight=33)
  vh=para(c,escape(value),right+panel-98,y,83,8.4,'Inter600',MINT,11,maxheight=33,align=2)
  y+=max(lh,vh)+10
 if y>top+ph:raise ValueError(f'Result card overflow {name}: {y}')
 link=BASE+d['route']+'/#'+d['tool']
 note="Example only. Try your own numbers with OptimIQ's <link href='"+link+"' color='"+GREEN+"'>online calculator</link>. Results are shown as ranges from OptimIQ's benchmark model."
 para(c,note,M,750,CW,7.7,'Inter400',MUTED,11,maxheight=33)
 footer(c,1);c.showPage()
 c.setFillColor(HexColor(BG));c.rect(0,0,W,H,fill=1,stroke=0);brand(c,24)
 line(c,M,67,CW)
 section(c,'HOW IT WORKS',d['how'],87,15)
 for i,(title,text) in enumerate(d['steps']):
  x=M+i*(col+12)
  box(c,x,144,24,24,GREEN,GREEN,12);para(c,str(i+1),x+8,150,12,8,'Inter600','#FFFFFF',10)
  ht=para(c,escape(title),x,181,col,10,'Jakarta700',SLATE,13,maxheight=26)
  para(c,escape(text),x,181+ht+8,col,8.8,'Inter400',MUTED,12.5,maxheight=68)
 section(c,'WHAT YOU GET',d['benefit'],286,14)
 bw=(CW-14)/2
 for i,(title,text) in enumerate(d['benefits']):
  x=M+(i%2)*(bw+14);y=330+(i//2)*120
  box(c,x,y,bw,108)
  c.setFillColor(HexColor(GREEN));c.circle(x+16,H-y-20,3,fill=1,stroke=0)
  ht=para(c,escape(title),x+29,y+12,bw-42,10,'Jakarta700',SLATE,13,maxheight=26)
  para(c,escape(text),x+16,y+12+ht+9,bw-32,8.5,'Inter400',MUTED,12,maxheight=108-(12+ht+9)-10)
 box(c,M,579,CW,57,'#EAF5EF','#D3E7DB')
 para(c,escape(d['quote']),M+18,594,CW-36,12,'Jakarta600',GREEN,17,maxheight=34)
 para(c,escape(d['cta']),M,655,CW,18,'Jakarta700',SLATE,23)
 para(c,escape(d['cta_intro']),M,684,CW,9.3,'Inter400',MUTED,13,maxheight=26)
 btnwidth=min(CW,pdfmetrics.stringWidth(d['button'],'Inter600',9)+41)
 box(c,M,716,btnwidth,34,GREEN,GREEN)
 para(c,escape(d['button'])+'  >',M+14,727,btnwidth-20,9,'Inter600','#FFFFFF',11)
 c.linkURL(BASE+d['route']+'/#'+d['anchor'],(M,H-750,M+btnwidth,H-716),relative=0,thickness=0)
 para(c,'Figures in this note and in the calculator are illustrative ranges, not quotes, offers or guarantees. Results are based on OptimIQ\'s benchmark model. © OptimIQ Consultus.',M,763,CW,7.2,'Inter400',MUTED,10,maxheight=30)
 footer(c,2);c.save()
 r=PdfReader(path);assert len(r.pages)==2
 extracted='\n'.join(p.extract_text() for p in r.pages)
 # Every substantive source paragraph is included; only routes, typography and unpublished-model wording are reconciled.
 expected=[d['intro'],d['problem'],d['calc'],d['calc_intro'],d['how'],d['benefit'],d['quote'],d['cta'],d['cta_intro']]+[v for pairs in [d['problems'],d['steps'],d['benefits'],d['answers'],d['details']] for pair in pairs for v in pair]
 norm=lambda s:re.sub(r'\s+',' ',s).strip()
 for text in expected:
  assert norm(text) in norm(extracted),(name,text)
 checks.append(dict(file=str(path.resolve()),pages=2,paragraph_checks=len(expected),fonts=sorted({str(v.get_object().get('/BaseFont')) for page in r.pages for v in page['/Resources']['/Font'].get_object().values()})))
 print(path, path.stat().st_size, 'bytes; content verified')
for name,data in DATA.items():pdf(name,data)
(TMP/'verification.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
