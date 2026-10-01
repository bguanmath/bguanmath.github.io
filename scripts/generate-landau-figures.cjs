/**
 * Render Landau blog figures with the installed GeoGebra JavaScript engine.
 * Requires Node.js, playwright and sharp (resolve via NODE_PATH if necessary).
 * Optional env: GGB_HTML_DIR, CHROME_PATH.
 * Run: node scripts/generate-landau-figures.cjs
 * API: https://geogebra.github.io/docs/reference/en/GeoGebra_Apps_API/
 * Curves are exported by GeoGebra; SVG composition adds legends and zoom layout.
 */
const { chromium } = require('playwright');
const sharp = require('sharp');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.GGB_HTML_DIR || '/Applications/GeoGebra Classic 6.app/Contents/Resources/app/html';
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const out = path.resolve(__dirname, '../images/posts');
const preview = '/private/tmp/landau-geogebra';
const C = { blue:'#1565C0', orange:'#D97706', green:'#15803D', purple:'#8B5CF6', gray:'#64748B', ink:'#243247' };
const html = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style><script>window.ggbOnInit=function(name,api){window.api=api||window.ggbApplet;window.ready=true;};</script></head><body><article class="geogebraweb" data-param-id="ggbApplet" data-param-width="1042" data-param-height="482" data-param-fontsize="20" data-param-appname="classic" data-param-perspective="G" data-param-showtoolbar="false" data-param-showmenubar="false" data-param-showalgebrainput="false" data-param-language="en" data-param-usebrowserforjs="true" data-param-showreseticon="false" data-param-showzoombuttons="false"></article><script src="/web3d/web3d.nocache.js"></script></body></html>`;
const server = http.createServer((req,res) => {
  if (req.url === '/') { res.setHeader('Content-Type','text/html'); res.end(html); return; }
  const file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  res.setHeader('Content-Type', ({'.js':'application/javascript','.css':'text/css','.html':'text/html','.wasm':'application/wasm','.woff2':'font/woff2'})[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).on('error',()=>res.end()).pipe(res);
});
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,s,size=22,color=C.ink,weight=400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${esc(s)}</text>`;
const legend = (x,y,label,color,dash='') => `<line x1="${x}" y1="${y-7}" x2="${x+40}" y2="${y-7}" stroke="${color}" stroke-width="4" ${dash?`stroke-dasharray="${dash}"`:''}/>${text(x+53,y,label,21,color)}`;
function embed(svg,x,y,w,h,id) {
  // Namespace GeoGebra's randomly generated clip IDs before combining exports.
  svg = svg.replace(/id="([^"]+)"/g,(_,v)=>`id="${id}-${v}"`).replace(/url\(#([^)]*)\)/g,(_,v)=>`url(#${id}-${v})`);
  return svg.replace(/<svg\b[^>]*>/,`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`);
}
function figure(height,title,desc,body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1120" height="${height}" viewBox="0 0 1120 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><metadata>Curves generated with GeoGebra Classic JavaScript API; see scripts/generate-landau-figures.cjs.</metadata><rect width="1120" height="${height}" fill="white"/><g font-family="Arial, Helvetica, sans-serif">${body}</g></svg>`;
}
async function save(name,svg) {
  fs.writeFileSync(path.join(out,name+'.svg'),svg);
  await sharp(Buffer.from(svg)).resize({width:1120}).png().toFile(path.join(preview,name+'.png'));
  console.log('Exported',name);
}
let browser;
(async()=>{
  fs.mkdirSync(out,{recursive:true}); fs.mkdirSync(preview,{recursive:true});
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  browser=await chromium.launch({executablePath:chrome,headless:true});
  const page=await browser.newPage({viewport:{width:1200,height:1000}});
  await page.goto('http://127.0.0.1:'+server.address().port);
  await page.waitForFunction(()=>window.ready && window.api,{timeout:45000});
  console.log('GeoGebra',await page.evaluate(()=>api.getVersion()));
  async function render({commands,styles,bounds,width=1040,height=480,steps=[1,1],axes=true,point=true}) {
    await page.evaluate(({commands,styles,bounds,width,height,steps,axes,point})=>{
      api.newConstruction(); api.setErrorDialogsActive(false); api.setRepaintingActive(false);
      api.setSize(width+2,height+2); api.setPerspective('G');
      api.setGraphicsOptions(1,{grid:true,gridType:0,gridColor:'#E8EDF3',axesColor:'#64748B',bgColor:'#FFFFFF',gridDistance:{x:steps[0],y:steps[1]}});
      api.setAxesVisible(axes,axes); api.setAxisLabels(1,'x','y'); api.setAxisSteps(1,...steps);
      api.setCoordSystem(...bounds);
      for(const cmd of commands) if(!api.evalCommand(cmd)) throw Error('GeoGebra command failed: '+cmd.slice(0,120));
      for(const name of api.getAllObjectNames()) api.setLabelVisible(name,false);
      for(const [name,color,thickness,dash=0] of styles) {
        const rgb=color.match(/[0-9a-f]{2}/gi).map(x=>parseInt(x,16));
        api.setColor(name,...rgb);api.setLineThickness(name,thickness);api.setLineStyle(name,dash);
      }
      if(point && api.exists('P')) {api.setPointSize('P',5);api.setColor('P',36,50,71);api.setLayer('P',9);}
      api.setRepaintingActive(true); api.refreshViews();
    },{commands,styles,bounds,width,height,steps,axes,point});
    // Wait for the app's resize/repaint to settle, without interacting with its UI.
    await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
    const result=await page.evaluate(()=>new Promise(resolve=>api.exportSVG(resolve)));
    if(!result || !result.startsWith('<svg')) throw Error('GeoGebra SVG export failed');
    const view=JSON.parse(await page.evaluate(()=>api.getViewProperties(1)));
    if(Math.abs(view.xMin-bounds[0])>1e-6 || Math.abs(view.yMin-bounds[2])>1e-6) throw Error('Unexpected coordinate window');
    return result;
  }
  // Exact prime-counting staircase: the value increases by 1 at each prime.
  const sieve=Array(2001).fill(true);sieve[0]=sieve[1]=false;
  for(let p=2;p*p<=2000;p++)if(sieve[p])for(let k=p*p;k<=2000;k+=p)sieve[k]=false;
  const primes=sieve.flatMap((yes,n)=>yes?[n]:[]);
  if(primes.length!==303)throw Error('Prime sieve verification failed');
  const pts=['(0,0)']; primes.forEach((p,i)=>pts.push(`(${p},${i})`,`(${p},${i+1})`));pts.push('(2000,303)');
  const primeSvg=await render({commands:[`pc=Polyline({${pts.join(',')}})`,'g(x)=If(2<=x<=2000,x/ln(x))'],styles:[['pc',C.blue,4],['g',C.orange,5]],bounds:[-100,2100,-25,340],steps:[250,50],point:false});
  await save('landau-prime-counting',figure(650,'Counting primes up to 2000','The exact prime-counting staircase and x divided by the natural logarithm of x, with x/log x plotted for 2 ≤ x ≤ 2000.',text(40,40,'Counting primes up to 2000',27,C.ink,600)+legend(40,82,'π(x): exact prime count',C.blue)+legend(540,82,'x / log x  (natural logarithm)',C.orange)+embed(primeSvg,40,105,1040,480,'prime')+text(70,627,'π(2000) = 303;     2000 / log 2000 ≈ 263.13.  The theorem concerns relative error as x → ∞.',19,C.gray)));
  const common=['f(x)=sqrt(x)','l(x)=3+(x-9)/6','P=(9,3)'];
  const linearSvg=await render({commands:[...common,'c(x)=3','r(x)=3+0.30*(x-9)'],styles:[['f',C.blue,6],['l',C.orange,5],['c',C.gray,4,1],['r',C.purple,4,2]],bounds:[-1,11,-.5,4],steps:[1,.5]});
  const pos=(x,y,b,ox,oy,w,h)=>[ox+(x-b[0])/(b[1]-b[0])*w,oy+(b[3]-y)/(b[3]-b[2])*h];
  const p1=pos(9,3,[-1,11,-.5,4],40,135,1040,480);
  await save('landau-linear-approximation',figure(690,'From a constant to the best linear approximation','Graph of sqrt(x), y=3, the tangent y=3+(x−9)/6, and a trial line with A=3 and B=0.30. The point (9,3) is marked.',text(40,40,'From a constant to a linear approximation',27,C.ink,600)+legend(40,80,'y = √x',C.blue)+legend(540,80,'Tangent: y = 3 + (x − 9)/6',C.orange)+legend(40,116,'y = 3',C.gray,'8 6')+legend(540,116,'y = A + Bh = A + B(x − 9)',C.purple,'3 6')+embed(linearSvg,40,135,1040,480,'linear')+text(p1[0]+10,p1[1]+38,'(9, 3)',21,C.ink,600)+text(65,660,'Trial line: A = 3, B = 0.30.     Here h = x − 9; all three approximations pass through (9, 3).',19,C.gray)));
  const quadraticCommands=[...common,'q(x)=3+(x-9)/6-(x-9)^2/216'];
  const quadStyles=[['f',C.blue,6],['l',C.orange,5],['q',C.green,4,1]];
  const quadSvg=await render({commands:quadraticCommands,styles:quadStyles,bounds:[-1,11,-.5,4],steps:[1,.5],height:390});
  const zoomBounds=[7.5,10.5,2.68,3.31];
  const zoomSvg=await render({commands:quadraticCommands,styles:quadStyles,bounds:zoomBounds,steps:[.5,.1],axes:false,height:390});
  const mainP=pos(9,3,[-1,11,-.5,4],40,120,1040,390);
  const zoomP=pos(9,3,zoomBounds,40,585,1040,390);
  const boxTL=pos(7.5,3.31,[-1,11,-.5,4],40,120,1040,390);
  const boxBR=pos(10.5,2.68,[-1,11,-.5,4],40,120,1040,390);
  let ticks='';
  for(let x=7.5;x<=10.5;x+=.5){let px=pos(x,2.68,zoomBounds,40,585,1040,390)[0];ticks+=`<text x="${px}" y="1002" text-anchor="middle" font-size="19" fill="${C.gray}">${x}</text>`;}
  for(let y=2.7;y<=3.301;y+=.1){let py=pos(7.5,y,zoomBounds,40,585,1040,390)[1];ticks+=`<text x="34" y="${py+6}" text-anchor="end" font-size="17" fill="${C.gray}">${y.toFixed(1)}</text>`;}
  const highlight=`<rect x="${boxTL[0]}" y="${boxTL[1]}" width="${boxBR[0]-boxTL[0]}" height="${boxBR[1]-boxTL[1]}" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="6 5"/>`;
  await save('landau-quadratic-approximation',figure(1065,'The best quadratic approximation and a local magnification','Overview of sqrt(x), its tangent and its quadratic Taylor polynomial at (9,3), with a second panel magnifying 7.5 ≤ x ≤ 10.5. The blue and green curves nearly coincide in the local view.',text(40,38,'The best quadratic approximation at (9, 3)',27,C.ink,600)+legend(40,78,'y = √x',C.blue)+legend(310,78,'L: 3 + (x − 9)/6',C.orange)+legend(610,78,'Q: 3 + (x − 9)/6 − (x − 9)²/216',C.green,'8 6')+embed(quadSvg,40,120,1040,390,'quad')+highlight+text(mainP[0]+10,mainP[1]+37,'(9, 3)',20,C.ink,600)+text(40,556,'Local magnification: 7.5 ≤ x ≤ 10.5',24,C.ink,600)+embed(zoomSvg,40,585,1040,390,'zoom')+`<rect x="40" y="585" width="1040" height="390" fill="none" stroke="#CBD5E1"/>`+ticks+text(1097,1022,'x',19,C.gray)+text(10,574,'y',19,C.gray)+text(zoomP[0]+10,zoomP[1]+37,'(9, 3)',20,C.ink,600)+text(40,1043,'The quadratic (green, dashed) almost overlaps √x (blue); the tangent (orange) separates more visibly.',19,C.gray)));
  console.log('Verified π(2000)=303 and all requested coordinate windows.');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();server.close();});
