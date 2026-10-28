import re,glob,os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
head,foot=open('outils/gabarit.txt').read().split('\n@@\n')
order=['index','prestations','saisons','contact']
for p in glob.glob('outils/pages/*.html'):
    n=os.path.basename(p)[:-5];src=open(p).read()
    meta,body=src.split('\n---\n',1);t,d=meta.split('\n')
    h=head
    h=re.sub(r'<title>.*?</title>','<title>'+t+'</title>',h)
    h=re.sub(r'(name="description" content=")[^"]*','\\g<1>'+d,h)
    for i,o in enumerate(order):h=h.replace('{a%d}'%i,' aria-current="page"' if o==n else '')
    open(n+'.html','w').write(h+body+foot)
    print(n)
