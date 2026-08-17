import sys,re,os
src=open('archive/S208-factory-output.md',encoding='utf8').read()
blocks=re.findall(r'=== PAGE: (\S+)\nANCHOR:\n(.*?)\nEND_ANCHOR:\n(.*?)\nREPLACEMENT:\n(.*?)\n=== END PAGE', src, re.S)
apply = '--apply' in sys.argv
print(f"{len(blocks)} block(s) parsed\n")
ok=0; bad=0
for name,anc,end,rep in blocks:
    f=name+'.html'
    if not os.path.exists(f):
        print(f"MISSING FILE  {f}"); bad+=1; continue
    h=open(f,encoding='utf8').read()
    na=h.count(anc); ne=h.count(end)
    if na!=1 or ne!=1:
        print(f"AMBIGUOUS     {f}  anchor x{na}  end x{ne}"); bad+=1; continue
    i=h.index(anc); j=h.index(end)
    if j<i:
        print(f"ORDER         {f}  end before anchor"); bad+=1; continue
    j2=j+len(end)
    old=h[i:j2]
    print(f"OK            {f}  span {len(old)}b -> {len(rep)}b  ({len(rep)-len(old):+d})")
    if apply:
        open(f,'w',encoding='utf8').write(h[:i]+rep+h[j2:])
    ok+=1
print(f"\n{ok} ready, {bad} blocked" + ("  [APPLIED]" if apply else "  [DRY RUN]"))
