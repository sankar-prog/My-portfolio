(function(){'use strict';
var D=document,H=D.documentElement,B=D.body,CZ,NOFX=0;
function $(s,r){return(r||D).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches,IO='IntersectionObserver' in window;
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- theme ---------- */
$('#th').addEventListener('click',function(){CZ.cycle()});

/* ---------- header, progress, active link (rAF-throttled, cached measurements) ---------- */
var nav0=$('#nv'),hd=$('#hd'),bar=$('#bar'),ly=0,tk=0,dh=1;
function mz(){dh=Math.max(1,H.scrollHeight-innerHeight)}
function onS(){tk=0;var y=scrollY;hd.classList.toggle('hide',y>ly&&y>140&&!B.classList.contains('mo'));ly=y;bar.style.transform='scaleX('+Math.min(1,y/dh)+')';nav0.style.setProperty('--p',Math.min(1,y/dh))}
addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(onS)}},{passive:true});
addEventListener('resize',mz);addEventListener('load',mz);mz();
if(window.ResizeObserver)new ResizeObserver(mz).observe(B);
if(FINE)addEventListener('pointermove',function(e){if(e.clientY<70)hd.classList.remove('hide')},{passive:true});
D.addEventListener('click',function(e){if(B.classList.contains('mo')&&!e.target.closest('#nv'))B.classList.remove('mo')});
$$('#nv a').forEach(function(a){a.addEventListener('click',function(){B.classList.remove('mo')})});
var links=$$('#nv a'),fab=$('#fab');fab.addEventListener('click',function(e){e.stopPropagation();var o=B.classList.toggle('mo');fab.setAttribute('aria-expanded',o);fab.setAttribute('aria-label',o?'Close menu':'Open menu')});

if(IO){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-40% 0px -55% 0px'});$$('main section[id]').forEach(function(s){so.observe(s)})}

/* ---------- reveal on scroll + count-up ---------- */
function cnt(n){var to=+n.dataset.n;if(RM||!to)return;var s=0;n.textContent=0;requestAnimationFrame(function f(ts){if(!s)s=ts;var p=Math.min((ts-s)/900,1);n.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})}
var rv=$$('.rv');
if(IO){var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;ro.unobserve(t);t.style.transitionDelay=(Array.prototype.indexOf.call(t.parentNode.children,t)%4)*70+'ms';t.classList.add('in');var n=$('[data-n]',t);if(n)cnt(n);setTimeout(function(){t.style.transitionDelay=''},1100)})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});rv.forEach(function(t){ro.observe(t)})}
else rv.forEach(function(t){t.classList.add('in')});
/* pause continuous animations when off-screen */
if(IO){var lo=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('on',e.isIntersecting)})});$$('[data-live]').forEach(function(t){lo.observe(t)})}

/* ---------- typewriter ---------- */
var role=$('#role');
if(role&&!RM){var rs=['Python Developer','Fresher Django Developer','Coffee → Code ☕'],ri=0,ci=0,dl=0;(function ty(){var r=rs[ri];ci+=dl?-1:1;role.textContent=r.slice(0,ci);var w=dl?30:70;if(!dl&&ci===r.length){dl=1;w=1500}else if(dl&&ci===0){dl=0;ri=(ri+1)%rs.length;w=350}setTimeout(ty,w)})()}

/* ---------- Chennai clock + mood ---------- */
function clk(){try{var d=new Date(),t=d.toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'}),h=+new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'numeric',hourCycle:'h23'}).format(d);
 var m=h<6?'🌙 Debugging at 2 a.m. (counts as cardio)':h<12?'☀️ Morning — coffee loading':h<18?'🟢 Online — coding':h<23?'🌆 Evening — shipping':'🌙 Winding down';
 $$('[data-clock]').forEach(function(n){n.textContent=t});$('#mood').textContent=m}catch(e){}}
clk();setInterval(clk,30000);

/* ---------- contact form (opens your mail app) ---------- */
$('#fm').addEventListener('submit',function(e){e.preventDefault();var g=function(i){return $(i).value};location.href='mailto:devo.sankar@gmail.com?subject='+encodeURIComponent(g('#fj'))+'&body='+encodeURIComponent(g('#fx')+'\n\n— '+g('#fn')+' ('+g('#fe')+')');$('#fs').textContent='Opening your email app…'});

/* ---------- toast, confetti, coffee ---------- */
var tT;function toast(m){var t=$('#ts');t.textContent=m;t.classList.add('on');clearTimeout(tT);tT=setTimeout(function(){t.classList.remove('on')},2800)}
var cv,cx,ps=[],raf=0;
function conf(x,y,n){if(RM||NOFX)return;if(!cv){cv=D.createElement('canvas');cv.id='cf';B.appendChild(cv);cx=cv.getContext('2d')}cv.width=innerWidth;cv.height=innerHeight;var C=['#c8ff3a','#ffd93b','#ff7ab8','#7b93ff','#ff8a3d','#5df2c0'];
 for(var i=0;i<n;i++){var a=Math.random()*6.283,v=5+Math.random()*10;ps.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-7,c:C[i%6],s:6+Math.random()*7,r:Math.random()*6,l:1})}
 if(!raf)raf=requestAnimationFrame(function f(){cx.clearRect(0,0,cv.width,cv.height);ps=ps.filter(function(p){return p.l>0&&p.y<cv.height+40});
  ps.forEach(function(p){p.vy+=.4;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.r+=.2;p.l-=.01;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.strokeStyle='#111';cx.lineWidth=1.5;cx.strokeRect(-p.s/2,-p.s/4,p.s,p.s/2);cx.restore()});
  if(ps.length)raf=requestAnimationFrame(f);else{raf=0;cx.clearRect(0,0,cv.width,cv.height)}})}
var cof=+store.get('cof')||0,cn=$('#cn'),cb=$('#cof');cn.textContent=cof;
function coffee(){cof++;caf=Math.min(10,(caf||0)+2);cafUp();store.set('cof',cof);cn.textContent=cof;cb.classList.remove('pop');void cb.offsetWidth;cb.classList.add('pop');if(cof%10===0){conf(innerWidth/2,innerHeight*.7,120);toast('☕ Caffeine overload! '+cof+' coffees')}else toast('☕ +1 coffee · bugs −3')}
cb.addEventListener('click',coffee);
function party(){conf(innerWidth/2,innerHeight/2,160);toast('🎉 Party mode unlocked!')}
function wobble(){var h=$('h1');h.classList.add('wob');setTimeout(function(){h.classList.remove('wob')},1300);toast('s4nk4r.exe stopped working… just kidding 😄')}
function go(id){var el=D.getElementById(id);if(el)el.scrollIntoView({behavior:RM?'auto':'smooth'})}
function esc(v){return v.replace(/[&<>]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
var tm,to,ti,gm,hist=[],hi=0;
function sync(){B.classList.toggle('lk',!!((tm&&tm.classList.contains('on'))||(gm&&gm.classList.contains('on'))||(rw&&rw.classList.contains('on'))))}
function mk(html){var o=D.createElement('div');o.className='ov';o.innerHTML=html;B.appendChild(o);return o}

/* ---------- hidden terminal ( press ` or tap logo 5x ) ---------- */
function tp(h){var d=D.createElement('div');d.innerHTML=h;to.appendChild(d);to.scrollTop=to.scrollHeight}
function openT(){closeG();if(!tm){tm=mk('<div class="win"><div class="wh"><i></i><i></i><i></i><span>sankar@portfolio:~</span><button aria-label="Close">✕</button></div><div class="to"></div><label class="wl"><span>$</span><input autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command"></label></div>');to=$('.to',tm);ti=$('input',tm);
 $('button',tm).onclick=closeT;tm.addEventListener('click',function(e){if(e.target===tm)closeT()});
 ti.addEventListener('keydown',function(e){if(e.key==='Enter'){hist.push(ti.value);hi=hist.length;exec(ti.value);ti.value=''}else if(e.key==='ArrowUp'){e.preventDefault();if(hi>0)ti.value=hist[--hi]}else if(e.key==='ArrowDown'){e.preventDefault();ti.value=hi<hist.length-1?hist[++hi]:(hi=hist.length,'')}else if(e.key==='Escape'||e.key==='`'){e.preventDefault();closeT()}})}
 tm.classList.add('on');sync();if(!to.children.length)tp('<span class="g">Welcome to sankar.sh</span> — type <b>help</b> to begin.');setTimeout(function(){ti.focus()},50)}
function closeT(){if(tm){tm.classList.remove('on');sync();ti.blur()}}
function exec(v){var a=v.trim();if(!a)return;var l=a.toLowerCase(),w=l.split(/\s+/),c=w[0];tp('<span class="g">$</span> '+esc(a));
 if(l==='sudo hire sankar'){tp('[sudo] password for recruiter: ******');setTimeout(function(){tp('<span class="g">✔ Access granted.</span> Great decision. Opening contact…');setTimeout(function(){closeT();go('contact');conf(innerWidth/2,innerHeight/2,140)},900)},700);return}
 switch(c){
 case 'help':tp('<b>whoami</b> <b>ls</b> <b>cd</b> &lt;section&gt; <b>skills</b> <b>projects</b> <b>resume</b> <b>contact</b> <b>coffee</b> <b>python</b> <b>neofetch</b> <b>sudo hire sankar</b> <b>snake</b> <b>matrix</b> <b>disco</b> <b>rocket</b> <b>roll</b> <b>joke</b> <b>espresso</b> <b>decaf</b> <b>caffeine</b> <b>bugs</b> <b>quack</b> <b>party</b> <b>theme</b> <b>clear</b> <b>exit</b><br>…and a few things I haven’t listed 😉');break;
 case 'resume':case 'cv':closeT();showResume(false);break;
 case 'whoami':tp('sankar — Python developer from Dharmapuri, based in Chennai. Fuel: coffee ☕');break;
 case 'ls':tp('home/  about/  skills/  projects/  contact/');break;
 case 'cd':var t=(w[1]||'').replace('/','');if(!t||t==='..'||t==='~')t='home';if(['home','about','skills','projects','contact'].indexOf(t)>-1){tp('→ '+t);setTimeout(function(){closeT();go(t)},300)}else tp('cd: no such section: '+esc(t));break;
 case 'skills':tp('Python 85 · Django 80 · SQL 75 · MySQL 75 · Git 85 · HTML 90 · CSS 80 · JS 70<br>learning → AWS · Docker · REST APIs');break;
 case 'projects':tp('01 Portfolio · 02 E-Commerce Website · 03 Bus Ticket Booking · 04 AI Skin Disease Detection');break;
 case 'contact':tp('devo.sankar@gmail.com · open to opportunities');break;
 case 'coffee':tp('<pre>   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----\'</pre>+1 productivity, −3 bugs');coffee();break;
 case 'python':tp('&gt;&gt;&gt; import this<br>Beautiful is better than ugly.<br>Simple is better than complex.<br>Readability counts.');break;
 case 'neofetch':tp('<pre>  ◢◣     sankar@portfolio\n ◢██◣    ----------------\n◢████◣   Role: Python Developer\n████████ Stack: Django · MySQL\n ◥██◤    Base: Chennai, India\n  ◥◤     Fuel: coffee</pre>');break;
 case 'hello':case 'hi':tp('hello, human 👋');break;
 case 'date':tp(new Date().toString());break;
 case 'echo':tp(esc(a.slice(5)));break;
 case 'sudo':tp('sankar is not in the sudoers file. This incident will be reported 🚨 (just kidding)');break;
 case 'rm':tp('nice try 😄 permission denied.');break;
 case 'snake':openG();break;
 case 'matrix':closeT();matrix();break;
 case 'disco':closeT();disco();break;
 case 'rocket':closeT();rocket();break;
 case 'roll':closeT();roll();break;
 case 'espresso':closeT();caf=10;cafUp();break;
 case 'decaf':closeT();caf=0;cafUp();break;
 case 'caffeine':tp('caffeine level: '+caf+'/10 — '+CS[caf]);break;
 case 'joke':case 'quack':closeT();duckSay();break;
 case 'bugs':closeT();bugRush();break;
 case 'party':closeT();party();break;
 case 'theme':CZ.cycle();tp('theme → '+H.dataset.theme);break;
 case 'clear':to.innerHTML='';break;
 case 'exit':closeT();break;
 case 'fortune':tp(['A bug fixed today is a bug avoided tomorrow.','Your next commit will compile on the first try. (Unlikely.)','Coffee is the root of all code.'][Math.random()*3|0]);break;
 case 'hack':tp('Hacking NASA… ██████████ 100% — just kidding 😄');break;
 case 'about':tp('Sankar · Fresher Django dev · Chennai · powered by coffee ☕');break;
 case 'gravity':case 'flip':case 'zen':case 'confetti':closeT();W2[c]();break;
 default:tp('command not found: '+esc(c)+' — try <b>help</b>')}}


/* ---------- resume window ( Download Resume button / 'resume' command ) ---------- */
var rw,rtk=0;
function closeR(){rtk++;if(rw){rw.classList.remove('on');sync()}}
function showResume(auto){closeT();closeG();var tk=++rtk,i=0,rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(!rw){rw=mk('<div class="win"><div class="wh"><i></i><i></i><i></i><span>SankarArumugam.pdf</span><button aria-label="Close">✕</button></div><div class="to rz" tabindex="0"></div><div class="wl ra"><a class="btn k" href="SankarArumugam.pdf" download="SankarArumugam.pdf">⬇ Download PDF</a><span class="k">Esc to close</span></div></div>');
  $('button',rw).onclick=closeR;rw.addEventListener('click',function(e){if(e.target===rw)closeR()})}
 var ro=$('.to',rw);ro.innerHTML='';ro.scrollTop=0;rw.classList.add('on');sync();
 var L=['<div class="rs"><b>SANKAR ARUMUGAM</b></div>',
 '<div class="rs"><a href="mailto:sankararumugam0204@gmail.com">sankararumugam0204@gmail.com</a> | +91 8438506725</div>',
 '<div class="rs"><a href="https://www.linkedin.com/in/sankar-arumugam-489b76366" target="_blank" rel="noopener">linkedin.com/in/sankar-arumugam-489b76366</a></div>',
 '<div class="rs"><a href="https://github.com/sankar-prog" target="_blank" rel="noopener">github.com/sankar-prog</a> | <a href="https://devsankar.vercel.app" target="_blank" rel="noopener">devsankar.vercel.app</a> | Chennai - 600094</div>',
 '<div class="rs rh"><b>PROFESSIONAL SUMMARY</b></div>',
 '<div class="rs">Dedicated and detail-oriented BCA fresher with strong foundational knowledge in back-end development, web technologies and databases. Passionate about writing clean, maintainable code and solving practical problems using Python and Django. Interested in applying software engineering principles to real-world projects and growing in a collaborative environment.</div>',
 '<div class="rs rh"><b>EDUCATION</b></div>',
 '<div class="rs"><span class="g">Bachelor of Computer Applications (BCA)</span> <span class="k">Apr 2021 – May 2024</span><br>Don Bosco College, Dharmapuri</div>',
 '<div class="rs"><span class="g">HSC – Class XII (Math-Biology)</span> <span class="k">Apr 2020 – Mar 2021</span><br>Government Higher Secondary School, Dharmapuri</div>',
 '<div class="rs rh"><b>TECHNICAL SKILLS</b></div>',
 '<div class="rs"><span class="g">Languages:</span> Python, JavaScript, HTML, CSS, SQL<br><span class="g">Frameworks:</span> Django (MVT)<br><span class="g">Tools:</span> Git, GitHub, VS Code, SQL Workbench</div>',
 '<div class="rs rh"><b>CERTIFICATIONS</b></div>',
 '<div class="rs">• JavaScript Internship – Goimedia, Bengaluru (2023)<br>• Python Full Stack Development – Qspiders, Vadapalani (2024)</div>',
 '<div class="rs rh"><b>PROJECTS</b></div>',
 '<div class="rs"><span class="g">Bus Ticket Booking System</span> <span class="k">Python, Django, SQLite</span><br>• Developed a full-stack web application with dynamic bus listings, seat selection, and booking workflows.<br>• Implemented search filters and form validation using Django’s MVT pattern.<br>• Integrated SQLite database to handle user data, seat availability, and transaction records.</div>',
 '<div class="rs"><span class="g">E-Commerce Website</span> <span class="k">HTML, CSS, JavaScript</span><br>• Built a responsive e-Commerce front-end with product listings, filtering, and search features.<br>• Designed a mobile-first layout using HTML, CSS and JavaScript for cross-device compatibility.<br>• Focused on UI/UX design, accessibility, and interactive elements for better customer experience.</div>',
 '<div class="rs rh"><b>LANGUAGES KNOWN</b></div>',
 '<div class="rs">Tamil: Native proficiency<br>English: Intermediate proficiency</div>',
 auto?'<div class="rs"><span class="g">✔ SankarArumugam.pdf</span> — download started</div>':'<div class="rs"><span class="g">✔ End of file</span> — use the button below to download</div>'];
 function put(h){var d=D.createElement('div');d.innerHTML=h;ro.appendChild(d)}
 put('<span class="g">$</span> open SankarArumugam.pdf');
 (function nx(){if(tk!==rtk||i>=L.length)return;put(L[i++]);setTimeout(nx,rm?0:70)})()}
D.querySelectorAll('a[download]').forEach(function(a){a.addEventListener('click',function(){showResume(true)})});
addEventListener('keydown',function(e){if(!rw||!rw.classList.contains('on'))return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeR();return}if(!(e.ctrlKey||e.metaKey||e.altKey)&&e.key!=='Tab')e.stopPropagation()},true);

/* ---------- hidden game: squash the bugs (snake) ---------- */
var gc,gx,G=20,CELL=16,sn,dr,nd,fd,sc=0,bst=+store.get('snk')||0,gon=0,iv,gmsg,gsc,gb;
function pf(){do{fd=[Math.random()*G|0,Math.random()*G|0]}while(sn.some(function(q){return q[0]===fd[0]&&q[1]===fd[1]}))}
function gReset(){sn=[[10,10],[9,10],[8,10]];dr=[1,0];nd=[1,0];sc=0;gsc.textContent=0;pf()}
function rr(x,y,w,h,r){if(gx.roundRect){gx.beginPath();gx.roundRect(x,y,w,h,r);gx.fill()}else gx.fillRect(x,y,w,h)}
function draw(){gx.clearRect(0,0,320,320);gx.fillStyle='rgba(255,255,255,.12)';for(var i=0;i<G;i++)for(var j=0;j<G;j++)gx.fillRect(i*CELL+7,j*CELL+7,2,2);
 sn.forEach(function(q,i){gx.fillStyle=i?'#c8ff3a':'#ffd93b';rr(q[0]*CELL+1,q[1]*CELL+1,CELL-2,CELL-2,i?4:7)});gx.font='13px serif';gx.textAlign='center';gx.textBaseline='middle';gx.fillText('🐛',fd[0]*CELL+8,fd[1]*CELL+9)}
function gEnd(){clearInterval(iv);gon=0;if(sc>bst){bst=sc;store.set('snk',bst);gb.textContent=bst}gmsg.textContent='Game over · '+sc+' bugs squashed\nEnter / tap to retry';if(sc>=10)conf(innerWidth/2,innerHeight/2,120)}
function tick(){dr=nd;var h=[sn[0][0]+dr[0],sn[0][1]+dr[1]];if(h[0]<0||h[1]<0||h[0]>=G||h[1]>=G||sn.some(function(q){return q[0]===h[0]&&q[1]===h[1]}))return gEnd();sn.unshift(h);
 if(h[0]===fd[0]&&h[1]===fd[1]){sc++;gsc.textContent=sc;pf();clearInterval(iv);iv=setInterval(tick,Math.max(55,130-sc*4))}else sn.pop();draw()}
function gStart(){if(gon)return;gReset();gon=1;gmsg.textContent='';clearInterval(iv);iv=setInterval(tick,130);draw()}
function turn(m){if(m[0]!==-dr[0]||m[1]!==-dr[1])nd=m;if(!gon)gStart()}
function openG(){closeT();if(!gm){gm=mk('<div class="win"><div class="wh"><i></i><i></i><i></i><span>snake.py</span><button aria-label="Close">✕</button></div><div class="gs"><span>🐛 squashed: <b id="gsc">0</b></span><span>best: <b id="gb">0</b></span></div><div class="gw"><canvas width="320" height="320"></canvas><div class="gm"></div></div><p class="gh">Arrow keys / WASD / swipe · Esc to quit</p></div>');
 gc=$('canvas',gm);gx=gc.getContext('2d');gmsg=$('.gm',gm);gsc=$('#gsc');gb=$('#gb');gb.textContent=bst;
 $('button',gm).onclick=closeG;gm.addEventListener('click',function(e){if(e.target===gm)closeG()});gc.addEventListener('click',function(){if(!gon)gStart()});
 var sx=0,sy=0;gc.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});gc.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});
 gc.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)+Math.abs(dy)<20)return;turn(Math.abs(dx)>Math.abs(dy)?[dx>0?1:-1,0]:[0,dy>0?1:-1])})}
 gm.classList.add('on');sync();gReset();draw();gmsg.textContent='Press Enter or tap to start\nEat the bugs 🐛'}
function closeG(){if(gm){clearInterval(iv);gon=0;gm.classList.remove('on');sync()}}
var DIR={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};

/* ---------- global secrets: ` terminal, Konami, typed words ---------- */
var KK=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'],kp=0,KB='';
addEventListener('keydown',function(e){var g=e.target.tagName;
 if(gm&&gm.classList.contains('on')){var k0=e.key.length===1?e.key.toLowerCase():e.key;if(k0==='Escape'){closeG();return}if(k0==='Enter'||k0===' '){e.preventDefault();gStart();return}if(DIR[k0]){e.preventDefault();turn(DIR[k0])}return}
 if(g==='INPUT'||g==='TEXTAREA')return;
 if(e.key==='`'||e.key==='~'){e.preventDefault();tm&&tm.classList.contains('on')?closeT():openT();return}
 var k=e.key.toLowerCase();kp=k===KK[kp]?kp+1:(k===KK[0]?1:0);if(kp===KK.length){kp=0;party()}
 if(e.key.length===1){KB=(KB+k).slice(-8);[['snake',openG],['matrix',matrix],['disco',disco],['rocket',rocket],['roll',roll],['espresso',function(){caf=10;cafUp()}],['decaf',function(){caf=0;cafUp()}],['bugs',bugRush],['quack',duckSay],['joke',duckSay],['sankar',wobble],['coffee',coffee],['party',party]].forEach(function(z){if(KB.slice(-z[0].length)===z[0]){KB='';z[1]()}})}});
var lgc=0,lgt=0;$('.logo').addEventListener('click',function(){var n=Date.now();lgc=n-lgt<900?lgc+1:1;lgt=n;if(lgc>=5){lgc=0;toast('🔓 Developer mode unlocked');openT()}});

/* ---------- small details ---------- */
var ot=D.title;D.addEventListener('visibilitychange',function(){D.title=D.hidden?'👀 Come back — your coffee is getting cold ☕':ot});
var idleT,nudged=0;function rid(){clearTimeout(idleT);if(!nudged)idleT=setTimeout(function(){nudged=1;toast('Still there? ☕ The coffee is getting cold.')},45000)}
['pointerdown','keydown','scroll'].forEach(function(ev){addEventListener(ev,rid,{passive:true})});rid();
console.log('%c ✦ SANKAR.DEV ','font:700 16px monospace;background:#c8ff3a;color:#111;padding:6px 10px;border:3px solid #111','\nHey, fellow developer 👋\nPress ` for a secret terminal, or try the Konami code.\nHiring? → sudo hire sankar  |  devo.sankar@gmail.com');

/* ---------- v2: name drop, cursor ring, sparks, tilt, magnetic ---------- */
var h1=$('h1');
if(h1&&!RM&&h1.lastChild&&h1.lastChild.nodeType===3){var wp=D.createElement('b');wp.className='nm';h1.lastChild.textContent.split('').forEach(function(ch,i){var s=D.createElement('span');s.textContent=ch;s.style.setProperty('--i',i);wp.appendChild(s)});h1.replaceChild(wp,h1.lastChild)}
if(!IO)H.classList.add('no-io');
var SC=['#c8ff3a','#ffd93b','#ff7ab8','#7b93ff','#ff8a3d','#5df2c0'];
function spark(x,y){var s=D.createElement('span');s.className='sp';s.textContent='✦';s.style.cssText='left:'+x+'px;top:'+y+'px;color:'+SC[Math.random()*6|0]+';--dx:'+(Math.random()*44-22)+'px;--dy:'+(24+Math.random()*30)+'px';B.appendChild(s);setTimeout(function(){s.remove()},850)}
if(FINE&&!RM){
 $$('.btn,.ib').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.25)+'px,'+((e.clientY-r.top-r.height/2)*.35)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})}

/* ---------- v2: more easter eggs (type: matrix, disco, rocket, roll) ---------- */
function matrix(){toast('🟩 Wake up, Sankar…');if(RM)return;var c=D.createElement('canvas');c.className='fx';c.width=innerWidth;c.height=innerHeight;B.appendChild(c);var x=c.getContext('2d'),f=16,n=Math.ceil(c.width/f),cl=[],t0=Date.now(),ch='01PYDJANGO{}<>/;=+アイウエオカキ';for(var i=0;i<n;i++)cl[i]=-(Math.random()*40|0);
 var m=setInterval(function(){x.fillStyle='rgba(0,0,0,.08)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#c8ff3a';x.font=f+'px monospace';for(var i=0;i<n;i++){x.fillText(ch[Math.random()*ch.length|0],i*f,cl[i]*f);if(cl[i]*f>c.height&&Math.random()>.97)cl[i]=0;cl[i]++}var e=Date.now()-t0;if(e>5000)c.style.opacity=0;if(e>5900){clearInterval(m);c.remove()}},45)}
function disco(){toast('🪩 Disco mode — 6 seconds of fun');B.classList.add('disco');conf(innerWidth/2,innerHeight/2,100);setTimeout(function(){B.classList.remove('disco')},6000)}
function rocket(){toast('🚀 To the moon! (and the job market)');var r=D.createElement('div');r.className='rk';r.textContent='🚀';B.appendChild(r);setTimeout(function(){r.remove();conf(innerWidth*.8,innerHeight*.25,80)},2400)}
function roll(){toast('🌀 Do a barrel roll!');B.classList.add('roll');setTimeout(function(){B.classList.remove('roll')},1400)}
var avc=0,avt=0;$('.av').addEventListener('click',function(){var n=Date.now();avc=n-avt<800?avc+1:1;avt=n;if(avc>=3){avc=0;var a=this;a.classList.add('spin');setTimeout(function(){a.classList.remove('spin')},1000);toast('🤖 Sankar.exe booting… 100% human, I promise')}});
$('.big2').addEventListener('click',rocket);

/* ---------- v4: section effects ---------- */
/* home: rising emoji */
/* about: talking avatar */
var av=$('.av');if(av){var bb=D.createElement('div');bb.className='bub';av.parentNode.appendChild(bb);var BL=['Hi! 👋','I run on coffee ☕','No bugs. Only features 🐛','Ask me about Django!','Hire me? 🥺','git commit -m "fixed it"'],bi=0;function say(){bb.classList.remove('pop');void bb.offsetWidth;bb.textContent=cafLine()||BL[bi++%BL.length];bb.classList.add('pop')}if(!RM){setTimeout(say,900);setInterval(say,3600)}}
/* skills: count-up + zap */
function pct(t){$$('.sk em',t).forEach(function(em,i){var to=parseInt(em.textContent),s=0,d=1100+i*100;if(RM||!to)return;requestAnimationFrame(function f(ts){if(!s)s=ts;var p=Math.min((ts-s)/d,1);em.textContent=Math.round(to*(1-Math.pow(1-p,3)))+'%';if(p<1)requestAnimationFrame(f);else{var k=em.closest('.sk');k.classList.add('zap');setTimeout(function(){k.classList.remove('zap')},700)}})})}
if(IO){var po=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){po.unobserve(e.target);pct(e.target)}})},{threshold:.35});$$('#skills .t').forEach(function(t){po.observe(t)})}
/* projects: party numbers */
$$('.pn').forEach(function(p){p.addEventListener('click',function(){var r=p.getBoundingClientRect();conf(r.left+r.width/2,r.top,70);toast('🎉 Project '+p.textContent+' — nice pick!')})});
/* contact: paper plane */
$('#fm').addEventListener('submit',function(){if(RM)return;var b=$('#fm .btn').getBoundingClientRect(),p=D.createElement('div');p.className='pl';p.textContent='✉️';p.style.cssText='left:'+b.left+'px;top:'+b.top+'px';B.appendChild(p);conf(b.left+b.width/2,b.top,60);setTimeout(function(){p.remove()},1450)});
/* footer: letters */
var f2=$('.big2');if(f2){var tx=f2.textContent;f2.textContent='';tx.split('').forEach(function(ch){var s=D.createElement('span');s.textContent=ch;f2.appendChild(s)})}

/* ---------- v5: loader, bug hunt, rubber duck, tap pops, small joys ---------- */
var ld=$('#ld');
if(ld){var LT=['Brewing coffee…','Compiling jokes…','Feeding the bugs…','Almost there…'],li2=0,lti=setInterval(function(){$('#lt').textContent=LT[++li2%LT.length]},400);
 var ldDone=0,ldHide=function(){if(ldDone)return;ldDone=1;clearInterval(lti);ld.classList.add('out');setTimeout(function(){ld.remove()},450)};if(D.readyState==='complete')setTimeout(ldHide,500);else{addEventListener('load',function(){setTimeout(ldHide,350)});setTimeout(ldHide,2000)}}
/* bug hunt */
var bugC=+store.get('bug')||0,bugAct=0;
function bug(){if(D.hidden)return;var b=D.createElement('div'),rt=Math.random()>.5;b.className='bg'+(rt?' rt':'');b.setAttribute('role','button');b.setAttribute('aria-label','Squash the bug');b.innerHTML='<i>🐛</i>';b.style.cssText='top:'+(90+Math.random()*(innerHeight-220))+'px;--d:'+(8+Math.random()*7)+'s';
 function sq(e){e.preventDefault();if(b.classList.contains('sq'))return;b.classList.add('sq');bugC++;store.set('bug',bugC);bugAct--;var r=b.getBoundingClientRect();conf(r.left+30,r.top+20,bugC%5===0?60:12);toast(bugC%10===0?'🏆 '+bugC+' bugs squashed — QA legend!':['Bug squashed! 🐛💥','Fewer bugs, more features ✨','Gotcha! Total: '+bugC,'It was a feature… was. 😬'][bugC%4]);setTimeout(function(){b.remove()},500)}
 b.addEventListener('pointerdown',sq);bugAct++;B.appendChild(b);setTimeout(function(){if(b.parentNode&&!b.classList.contains('sq')){b.remove();bugAct--}},16000)}
function bugRush(){toast('🐛 Bug invasion! Squash them all');for(var i=0;i<8;i++)setTimeout(bug,i*450)}
/* rubber duck */
var db=D.createElement('div');db.id='db';db.setAttribute('role','status');B.appendChild(db);
var JK=['Why do programmers prefer dark mode? Light attracts bugs. 🐛','There are 10 types of people: those who get binary and those who don’t.','A SQL query walks into a bar, sees two tables and asks: “Can I join you?”','It works on my machine ¯\\_(ツ)_/¯','Python devs don’t fear snakes. They fear indentation. 🐍','I told my code a joke. It threw an exception.','Debugging: being the detective in a crime movie where you are also the murderer.','Rubber duck says: have you tried explaining it out loud? 🦆','Why was the developer broke? He used up all his cache. 💸'],ji=Math.random()*JK.length|0;
function quack(){try{var A=new(window.AudioContext||window.webkitAudioContext)();[0,.17].forEach(function(d){var o=A.createOscillator(),g=A.createGain(),t=A.currentTime+d;o.type='sawtooth';o.frequency.setValueAtTime(540,t);o.frequency.exponentialRampToValueAtTime(230,t+.14);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);o.connect(g);g.connect(A.destination);o.start(t);o.stop(t+.18)});setTimeout(function(){A.close()},700)}catch(e){}}
function duckSay(){quack();db.classList.remove('on');void db.offsetWidth;db.textContent=JK[ji++%JK.length];db.classList.add('on')}

/* small joys */
$('#th').addEventListener('click',function(){toast({dark:'🌙 Dark mode: bugs can’t find you here',light:'☀️ Light mode: brave choice!',paper:'📄 Paper mode: fresh notebook smell'}[H.dataset.theme]||'🎨 Theme: '+H.dataset.theme)});
$('.fr a').addEventListener('click',rocket);
if(IO){var fo=new IntersectionObserver(function(es){if(es[0].isIntersecting){fo.disconnect();toast('🎉 You reached the bottom — legend!');conf(innerWidth/2,innerHeight*.6,120)}},{threshold:.7});fo.observe($('footer'))}

/* ---------- v6: light effects + small details ---------- */
var hs=$('h1>span');if(hs){var hr=new Date().getHours();hs.textContent=hr<5?'Still awake? I’m':hr<12?'Good morning, I’m':hr<17?'Good afternoon, I’m':hr<22?'Good evening, I’m':'Night owl? I’m'}
var yr=$('.fr span');if(yr)yr.textContent=yr.textContent.replace(/20\d\d/,new Date().getFullYear());
$$('.ci b').forEach(function(b){b.title='Click to copy';b.style.cursor='pointer';b.addEventListener('click',function(){var t=b.textContent;try{navigator.clipboard.writeText(t).then(function(){toast('📋 Copied: '+t)},function(){toast(t)})}catch(e){toast(t)}})});
var fx2=$('#fx');if(fx2){fx2.maxLength=500;var cc=D.createElement('small');cc.className='cc';cc.textContent='0 / 500';fx2.after(cc);fx2.addEventListener('input',function(){cc.textContent=fx2.value.length+' / 500';cc.classList.toggle('lo',fx2.value.length>450)})}

/* ---------- v7: Caffeine-o-meter — the whole website has a mood ---------- */
var caf=4,cafPrev='n',wasMax=0,CS=['Sleepy 😴','Sleepy 😴','Calm 🙂','Calm 🙂','Focused 😎','Focused 😎','Focused 😎','Hyper 🤪','Hyper 🤪','JITTERY 🫨','JITTERY 🫨'];
function cafSet(){return caf<=1?['💤','😴','🥱']:caf>=7?['🤪','🌀','💥','☕','🫨']:null}
function cafLine(){var a=caf<=1?['zzz… coffee… please…','Five more minutes ☕','Loading… 3%','Is it Monday already? 🥱']:caf>=7?['I CAN SEE THROUGH TIME ☕☕☕','Let’s refactor EVERYTHING!','Compiled it in my head!!','Why walk when you can SPRINT 🤪']:null;return a&&a[Math.random()*a.length|0]}
function cafUp(){caf=Math.max(0,Math.min(10,caf));$$('.cafm .sg i').forEach(function(s,i){s.classList.toggle('f',i<caf)});var cs=$('.cafm .cs');if(cs)cs.textContent=CS[caf];
 B.classList.toggle('sleepy',caf<=1);B.classList.toggle('hyper',caf>=7);H.style.setProperty('--sp',caf<=1?.35:caf>=9?2.6:caf>=7?1.8:1);
 var st=caf<=1?'s':caf>=7?'h':'n';if(st!==cafPrev){cafPrev=st;toast(st==='s'?'😴 Out of coffee… the website is falling asleep':st==='h'?'🤪 Caffeine kicked in — everything is faster!':'🙂 Back to normal')}
 if(caf===10&&!wasMax)toast('🫨 JITTERY! Maybe slow down on the coffee');wasMax=caf===10}
var hbx=$('.hero-b');if(hbx){var cm=D.createElement('button');cm.className='cafm';cm.setAttribute('aria-label','Caffeine meter — tap to brew coffee');cm.innerHTML='<span>☕ Caffeine: <b class="cs"></b></span><div class="sg"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small>tap to refuel · it wears off!</small>';hbx.insertBefore(cm,hbx.lastElementChild);cm.addEventListener('click',coffee)}
var ld2=D.createElement('div');ld2.id='lids';ld2.setAttribute('aria-hidden','true');ld2.innerHTML='<i></i><i></i>';B.appendChild(ld2);
setInterval(function(){if(D.hidden||caf<=2)return;caf--;cafUp()},120000);cafUp();

/* ---------- v13: more details & easter eggs (light: no pointer-tracking, no loops) ---------- */
var W2={
 confetti:function(){conf(innerWidth/2,innerHeight/2,140);toast('🎊 Surprise!')},
 hello:function(){toast('👋 Hello, human! Thanks for visiting')},
 coffee:function(){coffee()},
 flip:function(){toast('🙃 Whoa, the world flipped');B.classList.add('flip');setTimeout(function(){B.classList.remove('flip')},3000)},
 gravity:function(){toast('🍎 Gravity: ON');B.classList.add('grav');setTimeout(function(){B.classList.remove('grav')},2200)},
 zen:function(){var z=H.classList.toggle('zen');toast(z?'🧘 Zen mode: animations paused':'✨ Animations back')},
 hire:function(){toast('🤝 Great choice!');$('#contact').scrollIntoView({behavior:RM?'auto':'smooth'})},
 sankar:function(){toast('🫡 That’s me!')},
 python:function(){toast('🐍 import this → Beautiful is better than ugly')},
 django:function(){toast('🎸 The framework for perfectionists with deadlines')},
 chess:function(){toast('♟️ 1. e4 … your move')},
 volleyball:function(){toast('🏐 Spike!')}
},K2='';
addEventListener('keydown',function(e){
 if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|TEXTAREA/.test(D.activeElement.tagName)||$('.ov.on'))return;
 var i=+e.key,SEC=['home','about','skills','projects','contact'];
 if(i>=1&&i<=5){$('#'+SEC[i-1]).scrollIntoView({behavior:RM?'auto':'smooth'});return}
 if(e.key==='?'){toast('⌨️ 1–5 jump · ` terminal · Ctrl+K palette · type: gravity flip zen hello');return}
 if(e.key.length!==1)return;
 K2=(K2+e.key.toLowerCase()).slice(-12);
 for(var w in W2)if(K2.slice(-w.length)===w){K2='';W2[w]();break}
});
var up=D.createElement('button');up.id='up';up.textContent='↑';up.setAttribute('aria-label','Back to top');B.appendChild(up);
up.addEventListener('click',function(){scrollTo({top:0,behavior:RM?'auto':'smooth'})});
var upT=0;addEventListener('scroll',function(){if(upT)return;upT=1;requestAnimationFrame(function(){upT=0;up.classList.toggle('on',scrollY>900)})},{passive:true});
var SJ={Python:'85% — the other 15% is Stack Overflow 😅',JavaScript:'undefined is not a function… yet',SQL:'SELECT * FROM skills WHERE awesome = 1',HTML:'A markup language, not a programming one. Fight me.',CSS:'Centering a div: solved. Mostly.',Django:'Batteries included, coffee not included',Git:'git commit -m "fix" (the 47th one)',MySQL:'Keeps the database calm. Mostly.','VS Code':'Dark theme, light heart',AWS:'Currently lost in IAM policies ☁️',Docker:'Works on my container ™','REST APIs':'GET /coffee → 200 OK'};
$$('.sk').forEach(function(k){k.addEventListener('click',function(){var n=k.firstElementChild.firstChild.textContent.trim();toast('⚡ '+n+': '+(SJ[n]||'Always learning'))})});
var cw=$('.cw');if(cw)cw.addEventListener('click',function(){cw.classList.add('fast');toast('🎲 Rolling… it’s always Python');setTimeout(function(){cw.classList.remove('fast')},2500)});
var h1b=$('h1');if(h1b)h1b.addEventListener('dblclick',function(e){conf(e.clientX,e.clientY,70);toast('✨ Nice double-click!')});
var eb=$('#contact .act .btn');if(eb&&navigator.clipboard){var cb2=D.createElement('button');cb2.type='button';cb2.className='btn cpy';cb2.textContent='Copy email';cb2.addEventListener('click',function(){navigator.clipboard.writeText('devo.sankar@gmail.com').then(function(){toast('📋 Email copied — go write something nice')},function(){toast('Copy: devo.sankar@gmail.com')})});eb.parentNode.appendChild(cb2)}
if(IO){var so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){so.unobserve(x.target);toast(x.target.id==='skills'?'⚡ Skills unlocked':'✉️ Last stop — say hi!')}})},{threshold:.35});['skills','contact'].forEach(function(id){so.observe($('#'+id))})}
var T0=D.title;D.addEventListener('visibilitychange',function(){D.title=D.hidden?'☕ Come back… coffee’s getting cold':T0});
var idl,ir=function(){clearTimeout(idl);idl=setTimeout(function(){if(!D.hidden)toast('😴 Still there? Tap the coffee ☕')},60000)};
['pointerdown','keydown','scroll'].forEach(function(ev){addEventListener(ev,ir,{passive:true})});ir();
try{console.log('%c👋 Hey developer!','font:700 18px monospace;color:#e0457b','Poking around? Press ` for the secret terminal, or type  sudo hire sankar')}catch(e){}

(function(){
/* ---------- v14: interactive layer (event-driven only: no pointer tracking, no loops) ---------- */
function go(id){var e=$('#'+id);if(e)e.scrollIntoView({behavior:RM?'auto':'smooth'})}
var PL=[],AC={Pink:'#e0457b',Blue:'#4f7bff',Mint:'#18b98a',Orange:'#ff7a1a',Purple:'#8b5cf6'};
function acc(c){CZ.accent(c||'')}

['home','about','skills','projects','contact'].forEach(function(id){PL.push(['🧭 Go to '+id,function(){go(id)}])});
PL.push(['☕ Brew a coffee',coffee],['🐍 Play snake',openG],['💻 Open terminal',function(){setTimeout(function(){B.dispatchEvent(new KeyboardEvent('keydown',{key:'`',bubbles:true}))},80)}],['🎊 Confetti',W2.confetti],['🪩 Disco',disco],['🚀 Rocket',rocket],['🟩 Matrix',matrix],['🧘 Toggle zen mode',W2.zen],['📋 Copy email',function(){var b=$('.cpy');if(b)b.click()}],['🐙 Open GitHub',function(){open('https://github.com/sankar-prog','_blank','noopener')}],['💼 Open LinkedIn',function(){open('https://www.linkedin.com/in/sankar-arumugam-489b76366','_blank','noopener')}]);
Object.keys(AC).forEach(function(k){PL.push(['🎨 Accent: '+k,function(){acc(AC[k]);store.set('ac',AC[k]);toast('🎨 Accent: '+k)}])});
PL.push(['🎨 Accent: Reset',function(){acc();toast('🎨 Accent reset')}],['⚙️ Open customizer',function(){CZ.open()}]);
var pal=D.createElement('div');pal.className='ov';pal.id='pal';pal.innerHTML='<div class="win" role="dialog" aria-label="Command palette"><div class="wh"><i></i><i></i><i></i><span>command palette · Ctrl+K or /</span><button type="button" aria-label="Close">✕</button></div><div class="wl"><span>›</span><input id="pi" placeholder="Type a command…" autocomplete="off"></div><div class="to" id="pl"></div></div>';B.appendChild(pal);
var pi=$('#pi'),pl=$('#pl'),ps2=0,vis=[];
function pr(){var q=pi.value.toLowerCase();vis=PL.filter(function(c){return c[0].toLowerCase().indexOf(q)>-1});ps2=Math.min(ps2,Math.max(0,vis.length-1));pl.innerHTML='';vis.forEach(function(c,i){var b=D.createElement('button');b.type='button';b.className='pi'+(i===ps2?' sel':'');b.textContent=c[0];b.addEventListener('click',function(){run(c)});pl.appendChild(b)});if(!vis.length)pl.textContent='No match — try “coffee” or “snake”';var s=$('.sel',pl);if(s)s.scrollIntoView({block:'nearest'})}
function run(c){pc();c[1]()}
function po(){
  pal.classList.add('on');
  pi.value='';
  ps2=0;
  pr();

}
function pc(){pal.classList.remove('on')}
pi.addEventListener('input',function(){ps2=0;pr()});
pal.addEventListener('click',function(e){if(e.target===pal||e.target.closest('.wh button'))pc()});
addEventListener('keydown',function(e){
 var on=pal.classList.contains('on');
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();e.stopImmediatePropagation();on?pc():po();return}
 if(!on){if(e.key==='/'&&!/INPUT|TEXTAREA/.test(D.activeElement.tagName)&&!$('.ov.on')){e.preventDefault();e.stopImmediatePropagation();po()}return}
 e.stopImmediatePropagation();
 if(e.key==='Escape')pc();
 else if(e.key==='ArrowDown'){e.preventDefault();ps2=Math.min(vis.length-1,ps2+1);pr()}
 else if(e.key==='ArrowUp'){e.preventDefault();ps2=Math.max(0,ps2-1);pr()}
 else if(e.key==='Enter'&&vis[ps2]){e.preventDefault();run(vis[ps2])}
},true);

var SM={Projects:function(){go('projects')},'Years Experience':function(){toast('🌱 Everyone starts at 0 — the fun is the climb')},Dedication:function(){toast('💯 Also true on Mondays')}};
$$('.stat').forEach(function(s){var l=$('.lb',s),f=l&&SM[l.textContent.trim()];if(f&&s.tagName!=='BUTTON'){s.style.cursor='pointer';s.tabIndex=0;s.setAttribute('role','button');s.addEventListener('click',f);s.addEventListener('keydown',function(e){if(e.key==='Enter')f()})}});
var LK={};try{LK=JSON.parse(store.get('lk')||'{}')}catch(e){}
$$('#projects .t').forEach(function(t,i){var a=$('.act',t);if(!a)return;var b=D.createElement('button');b.type='button';b.className='btn lk';function u(){b.textContent=LK[i]?'♥ Liked':'♡ Like';b.setAttribute('aria-pressed',!!LK[i])}u();b.addEventListener('click',function(e){LK[i]=!LK[i];store.set('lk',JSON.stringify(LK));u();if(LK[i]){conf(e.clientX,e.clientY,30);toast('💛 Thanks for the love!')}});a.appendChild(b)});
var wt=D.createElement('div');wt.className='t s12';wt.innerHTML='<p class="lb mut">Leave a sticky note on my wall</p><div class="wall" id="wall" aria-live="polite"></div><form id="nf"><input id="nt" maxlength="60" placeholder="Write a note… (stays on your device)" required><button class="btn k" type="submit">Stick it ↗</button></form>';$('#contact').appendChild(wt);
var NC=['--yel','--pink','--mint','--blue','--lil','--org'],notes=[];try{notes=JSON.parse(store.get('notes')||'[]')}catch(e){}
function nr(){var w=$('#wall');w.innerHTML='';if(!notes.length){w.innerHTML='<span class="mut">The wall is empty — be the first to stick a note ✍️</span>';return}notes.forEach(function(t,i){var n=D.createElement('button');n.type='button';n.className='note';n.textContent=t;n.title='Click to remove';n.style.background='var('+NC[i%6]+')';n.style.rotate=((i*37%9)-4)+'deg';n.addEventListener('click',function(){notes.splice(i,1);store.set('notes',JSON.stringify(notes));nr();toast('🗑️ Note removed')});w.appendChild(n)})}
$('#nf').addEventListener('submit',function(e){e.preventDefault();var v=$('#nt').value.trim();if(!v)return;notes.push(v);if(notes.length>12)notes.shift();store.set('notes',JSON.stringify(notes));$('#nt').value='';nr();conf(innerWidth/2,innerHeight*.7,40);toast('📌 Note stuck!')});nr();
var fx=$('#fx');if(fx){fx.maxLength=500;var cc=D.createElement('small');cc.className='mut cc';cc.textContent='0 / 500';fx.after(cc);fx.addEventListener('input',function(){cc.textContent=fx.value.length+' / 500'})}
$('#fm').addEventListener('submit',function(){conf(innerWidth/2,innerHeight*.6,60)});
$('#fm').addEventListener('invalid',function(e){var t=e.target;t.classList.add('shake');setTimeout(function(){t.classList.remove('shake')},450)},true);
})();

/* ---------- v15: customizer panel (Ctrl+, or the 🎨 button) ---------- */
CZ=(function(){
var TC={aurora:'#050b18',synth:'#12002b',terminal:'#060804',blueprint:'#0a3a8c',sakura:'#ffeef3',light:'#efece4',paper:'#f2ead8',glass:'#0b1020',cyber:'#05070d',clay:'#e6e9f0'},TH=['paper','light','glass','cyber','clay','aurora','synth','terminal','blueprint','sakura'],
DEF={fc:'',lay:'',cs:'',bst:'',shd:'',gd:'',clk:'',snd:'',mg:0,st:0,dy:0,hc:0,ss:0,ls:0,cb:'',cc:'',ct:'',hu:0,sa:1,cur:'',amb:'',ch:'',he:'',vg:0,sc:0,tod:0,th:'paper',ac:'',hf:'',bg:'',dn:'',r:'',ms:1,tilt:1,tape:1,fx:1,toast:1,anim:1,bf:'',w:'',ts:1,gr:0,bs:'',bd:'',lh:'',pc:'',hv:1,pb:1,nv:1,bt:1,mq:1,sk:1},
O={th:[['paper','Paper'],['light','Bold'],['glass','Glass'],['cyber','Cyber'],['clay','Clay'],['aurora','Aurora'],['synth','Synthwave'],['terminal','Terminal'],['blueprint','Blueprint'],['sakura','Sakura']],lay:[['','Bento'],['stack','Stack'],['duo','Duo']],cs:[['','Normal'],['notch','Notch'],['bevel','Bevel'],['ticket','Ticket']],bst:[['','Theme'],['dashed','Dashed'],['dotted','Dotted'],['double','Double'],['none','None']],shd:[['','Theme'],['hard','Hard'],['soft','Soft'],['glow','Glow'],['none','None']],gd:[['','None'],['sun','Sunrise'],['sea','Ocean'],['forest','Forest'],['dusk','Dusk']],clk:[['','Off'],['ripple','Ripple'],['emoji','Emoji'],['sparks','Sparks']],snd:[['','Off'],['soft','Soft'],['retro','Retro'],['type','Typewriter']],he:[['','None'],['gradient','Gradient'],['neon','Neon'],['glitch','Glitch'],['outline','Outline']],amb:[['','Off'],['stars','Stars'],['snow','Snow'],['petals','Petals'],['bubbles','Bubbles'],['fireflies','Fireflies']],cur:[['','Default'],['ring','Ring'],['dot','Glow dot'],['trail','Comet'],['coffee','☕']],ch:[['','Lift'],['glow','Glow'],['zoom','Zoom'],['wobble','Wobble'],['invert','Invert']],bf:[['','Auto'],['serif','Serif'],['mono','Mono'],['round','Round']],w:[['narrow','Narrow'],['','Normal'],['wide','Wide']],bs:[['','Pill'],['round','Rounded'],['square','Square']],bd:[['thin','Thin'],['','Normal'],['thick','Thick']],lh:[['tight','Tight'],['','Normal'],['airy','Airy']],hf:[['','Auto'],['hand','Hand'],['sans','Sans'],['serif','Serif'],['mono','Mono']],bg:[['','Theme'],['plain','Plain'],['dots','Dots'],['grid','Grid'],['lines','Lines']],dn:[['compact','Tight'],['','Normal'],['roomy','Roomy']]},
SW=['#e0457b','#4f7bff','#18b98a','#ff7a1a','#8b5cf6','#d8f071'],S,last;
try{S=JSON.parse(store.get('cz'))}catch(e){}
S=Object.assign({},DEF,S);Object.keys(S).forEach(function(k){if(!(k in DEF))delete S[k]});if(!S.ac&&store.get('ac'))S.ac=store.get('ac');if(TH.indexOf(S.th)<0)S.th='paper';if(S.cs==='blob')S.cs='';
function seg(k,t){return '<div class="cl"><p class="lb">'+t+'</p><div class="sg2" role="radiogroup" aria-label="'+t+'" data-k="'+k+'">'+O[k].map(function(o){return '<button type="button" role="radio" data-v="'+o[0]+'">'+o[1]+'</button>'}).join('')+'</div></div>'}
function tg(k,t){return '<label class="tg"><input type="checkbox" data-k="'+k+'"><span class="tk"></span><span class="tx">'+t+'</span><b class="st"></b></label>'}
function pulse(el){if(!el)return;el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}
var P=D.createElement('aside');P.id='cz';P.setAttribute('role','dialog');P.setAttribute('aria-label','Customize this site');
P.innerHTML='<div class="ch"><b>🎨 Customize</b><button type="button" class="cx" aria-label="Close">✕</button></div><div class="cb">'+seg('th','Theme')
+'<div class="cl"><p class="lb">Accent color</p><div class="sw">'+SW.map(function(c){return '<button type="button" data-c="'+c+'" style="--c:'+c+'" aria-label="Accent '+c+'"></button>'}).join('')+'<input type="color" data-k="ac" value="#e0457b" aria-label="Custom accent color"></div></div>'
+'<div class="cl">'+tg('tod','🌗 Auto theme by time of day')+'</div>'+seg('lay','Layout')+seg('cs','Card shape')+seg('bst','Card border')+seg('shd','Card shadow')+'<div class="cl"><p class="lb">Background color</p><div class="sw">'+['#ffffff','#fdeff2','#e8f3ff','#eaf7ee','#f3ecff','#fff4d6','#1a1a2e','#111111'].map(function(c){return '<button type="button" data-b="'+c+'" style="--c:'+c+'" aria-label="Background '+c+'"></button>'}).join('')+'<input type="color" data-k="cb" aria-label="Custom background color"></div></div>'+seg('gd','Gradient overlay')+'<div class="cl"><p class="lb">Focus color · outline on buttons &amp; fields</p><div class="sw">'+['#1fb35a','#e0457b','#4f7bff','#ff7a1a','#8b5cf6','#00c2d1'].map(function(c){return '<button type="button" data-f="'+c+'" style="--c:'+c+'" aria-label="Focus color '+c+'"></button>'}).join('')+'<input type="color" data-k="fc" aria-label="Custom focus color"></div></div>'+seg('clk','Click effect')+seg('snd','UI sounds')+'<div class="cl"><p class="lb">Card &amp; text colors</p><div class="sw"><input type="color" data-k="cc" aria-label="Card color"><input type="color" data-k="ct" aria-label="Text color"></div></div>'+seg('he','Headline effect')+seg('amb','Ambient particles')+seg('cur','Cursor')+seg('ch','Card hover')+seg('hf','Headline font')+seg('bf','Body font')+seg('bg','Background')+seg('dn','Spacing')+seg('w','Page width')+seg('bs','Button shape')+seg('bd','Borders')+seg('lh','Text spacing')+'<div class="cl"><p class="lb">Page color · Paper &amp; Bold</p><div class="sw">'+['#ffffff','#fdeff2','#e8f3ff','#eaf7ee','#f3ecff'].map(function(c){return '<button type="button" data-p="'+c+'" style="--c:'+c+'" aria-label="Page color '+c+'"></button>'}).join('')+'</div></div>'
+'<div class="cl"><p class="lb">Hue shift · <output data-o="hu"></output></p><input type="range" min="0" max="360" step="5" data-k="hu" aria-label="Hue shift"></div><div class="cl"><p class="lb">Saturation · <output data-o="sa"></output></p><input type="range" min="0" max="2" step="0.1" data-k="sa" aria-label="Saturation"></div>'+'<div class="cl"><p class="lb">Letter spacing · <output data-o="ls"></output></p><input type="range" min="-0.05" max="0.3" step="0.01" data-k="ls" aria-label="Letter spacing"></div>'+'<div class="cl"><p class="lb">Corners · <output data-o="r"></output></p><input type="range" min="0" max="36" data-k="r" aria-label="Corner radius"></div>'
+'<div class="cl"><p class="lb">Marquee speed · <output data-o="ms"></output></p><input type="range" min="0.3" max="3" step="0.1" data-k="ms" aria-label="Marquee speed"></div>'
+'<div class="cl"><p class="lb">Content size · <output data-o="ts"></output></p><input type="range" min="0.85" max="1.25" step="0.05" data-k="ts" aria-label="Content size"></div>'+[['mg','Magnetic buttons'],['st','Scroll-reactive color tint'],['ss','Idle screensaver (25s)'],['dy','Dyslexia-friendly text'],['hc','High contrast'],['vg','Vignette'],['sc','CRT scanlines'],['gr','Film grain'],['hv','Card hover lift'],['pb','Scroll progress bar'],['nv','Side nav dock'],['bt','Back-to-top button'],['mq','Skills marquee'],['sk','Hero sticker'],['tilt','Tilted paper cards'],['tape','Washi tape'],['fx','Confetti &amp; effects'],['toast','Toast messages'],['anim','Animations']].map(function(a){return tg(a[0],a[1])}).join('')
+'<div class="cf"><button type="button" class="btn" data-a="rnd">🎲 Surprise me</button><button type="button" class="btn" data-a="rst">Reset</button></div></div>';
B.appendChild(P);
var btn=D.createElement('button');btn.id='czb';btn.className='ib';btn.type='button';btn.textContent='🎨';btn.setAttribute('aria-label','Customize site');btn.setAttribute('aria-expanded','false');$('#hd').appendChild(btn);
var IC={home:'M3 11 12 3l9 8v10h-6v-6H9v6H3z',about:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z',skills:'M13 2 4 14h7l-1 8 9-12h-7z',projects:'M12 2c3 2 5 6 5 10l-2 3H9l-2-3c0-4 2-8 5-10zM9 15l-3 4 4-1zM15 15l3 4-4-1zM10.4 9a1.6 1.6 0 1 0 3.2 0 1.6 1.6 0 1 0-3.2 0z',contact:'M3 5h18v14H3zM3 5l9 8 9-8',theme:'M12 3C6.5 3 3 7 3 11.5S6.5 20 11 20c1.5 0 2-1 2-2s-1-1.6-1-2.6S13 14 14.5 14H17c2.2 0 4-1.6 4-4 0-3.8-4-7-9-7zM7.5 11a1 1 0 1 0 2 0 1 1 0 1 0-2 0zM10.5 8a1 1 0 1 0 2 0 1 1 0 1 0-2 0zM14.5 8.5a1 1 0 1 0 2 0 1 1 0 1 0-2 0z'},NK=['home','about','skills','projects','contact'];
/* a different icon style per theme: paper=pencil sketch, bold=offset sticker, glass=frosted outline, cyber=thin neon, clay=solid blob */
function ico(k,t){t={aurora:'glass',synth:'cyber',terminal:'cyber',blueprint:'cyber',sakura:'paper'}[t]||t;var d=IC[k],r='fill-rule="evenodd" ',u='',a;
 if(t==='light'){u='<path '+r+'d="'+d+'" transform="translate(2 2)" fill="var(--lg2)"/>';a='fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square" stroke-linejoin="miter"'}
 else if(t==='glass')a='fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
 else if(t==='cyber')a='fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="square" stroke-linejoin="miter"';
 else if(t==='clay')a='fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
 else{u='<path d="'+d+'" transform="translate(.8 .7)" opacity=".4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>';a='fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"'}
 return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">'+u+'<path '+r+'d="'+d+'" '+a+'/></svg>'}
function tod(){var h=new Date().getHours();return h<6?'aurora':h<10?'sakura':h<17?'light':h<20?'synth':'aurora'}
function ap(){
 var E=S.tod?tod():S.th;H.dataset.theme=E;
 $$('#nv a s').forEach(function(s,i){s.innerHTML=ico(NK[i],E)});btn.innerHTML=ico('theme',E);$('.ch b',P).innerHTML=ico('theme',E)+' Customize';
 ['hf','bg','dn','bf','w','bs','bd','lh'].forEach(function(k){if(S[k])H.dataset[k]=S[k];else delete H.dataset[k]});
 H.classList.toggle('ac-on',!!S.ac);if(S.fc)H.style.setProperty('--fc',S.fc);else H.style.removeProperty('--fc');
 [['--ac',S.ac],['--lg2',S.ac],['--r',S.r===''?'':S.r+'px']].forEach(function(p){p[1]?H.style.setProperty(p[0],p[1]):H.style.removeProperty(p[0])});
 H.style.setProperty('--ms',S.ms);H.style.setProperty('--ts',S.ts);H.classList.toggle('gr',!!S.gr);H.classList.toggle('nh',!S.hv);H.classList.toggle('npb',!S.pb);H.classList.toggle('nnv',!S.nv);H.classList.toggle('nbt',!S.bt);H.classList.toggle('nmq',!S.mq);H.classList.toggle('nsk',!S.sk);H.classList.toggle('pc',!!S.pc);if(S.pc)H.style.setProperty('--pcv',S.pc);else H.style.removeProperty('--pcv');
 H.classList.toggle('nt',!S.tilt);H.classList.toggle('nx',!S.tape);H.classList.toggle('nts',!S.toast);H.classList.toggle('zen',!S.anim);
 ['cur','amb','ch','he'].forEach(function(k){S[k]?H.dataset[k]=S[k]:delete H.dataset[k]});H.classList.toggle('vg',!!S.vg);H.classList.toggle('sc',!!S.sc);H.classList.toggle('fl',+S.hu!==0||+S.sa!==1);H.style.setProperty('--hu',S.hu+'deg');H.style.setProperty('--sa',S.sa);if(window.AMB)AMB();['lay','cs','bst','shd','gd','clk','snd'].forEach(function(k){S[k]?H.dataset[k]=S[k]:delete H.dataset[k]});['st','dy','hc'].forEach(function(k){H.classList.toggle(k,!!S[k])});H.style.setProperty('--ls',S.ls+'em');[['--bg',S.cb],['--card',S.cc],['--ink',S.ct]].forEach(function(p){p[1]?H.style.setProperty(p[0],p[1]):H.style.removeProperty(p[0])});if(!S.mg)$$('.btn').forEach(function(b){b.style.translate=''});if(window.SW)window.SW();if(window.TNT)TNT();
 NOFX=!S.fx;var m=$('meta[name=theme-color]');if(m)m.content=TC[E];
 store.set('cz',JSON.stringify(S));store.set('ac',S.ac);
 $$('.sg2',P).forEach(function(g){$$('button',g).forEach(function(b){b.setAttribute('aria-checked',String(S[g.dataset.k])===b.dataset.v)})});
 $$('.sw button',P).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.c?S.ac===b.dataset.c:b.dataset.f?S.fc===b.dataset.f:b.dataset.b?S.cb===b.dataset.b:S.pc===b.dataset.p)});
 $$('input[data-k]',P).forEach(function(i){var k=i.dataset.k;if(i.type==='checkbox')i.checked=!!S[k];else if(i.type==='range')i.value=S[k]===''?5:S[k];else if(i.type==='color')i.value=/^#[0-9a-f]{6}$/i.test(S[k])?S[k]:(k==='ac'?'#e0457b':k==='fc'?'#1fb35a':'#888888')});
 $$('output',P).forEach(function(o){o.textContent={ls:S.ls+'em',hu:S.hu+'°',sa:Math.round(S.sa*100)+'%',r:S.r===''?'auto':S.r+'px',ms:S.ms+'×',ts:Math.round(S.ts*100)+'%'}[o.dataset.o]});
}
function op(){last=D.activeElement;P.classList.add('on');btn.setAttribute('aria-expanded','true');setTimeout(function(){var f=$('[aria-checked=true]',P);if(f)f.focus()},60)}
function cl(){P.classList.remove('on');btn.setAttribute('aria-expanded','false');(last||btn).focus()}
btn.addEventListener('click',function(){P.classList.contains('on')?cl():op()});
P.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;pulse(b);
 if(b.classList.contains('cx'))return cl();
 var g=b.closest('.sg2');if(g){S[g.dataset.k]=b.dataset.v;return ap()}
 if(b.dataset.f){S.fc=S.fc===b.dataset.f?'':b.dataset.f;return ap()}
 if(b.dataset.b){S.cb=S.cb===b.dataset.b?'':b.dataset.b;return ap()}
 if(b.dataset.p){S.pc=S.pc===b.dataset.p?'':b.dataset.p;return ap()}
 if(b.dataset.c){S.ac=S.ac===b.dataset.c?'':b.dataset.c;return ap()}
  var ac=b.dataset.a;
 if(b.dataset.a==='rst'){S=Object.assign({},DEF);ap();toast('↺ Back to defaults')}
 if(b.dataset.a==='rnd'){var pk=function(a){return a[Math.random()*a.length|0]};S.th=pk(TH);S.ac=pk(SW);S.hf=pk(O.hf)[0];S.bg=pk(O.bg)[0];S.bf=pk(O.bf)[0];S.he=pk(O.he)[0];S.amb=pk(O.amb)[0];S.ch=pk(O.ch)[0];S.hu=pk([0,0,40,90,180,270]);S.gd=pk(O.gd)[0];S.shd=pk(O.shd)[0];S.cs=pk(O.cs)[0];S.bst=pk(O.bst)[0];S.clk=pk(O.clk)[0];S.tod=0;ap();toast('🎲 New look')}});
P.addEventListener('input',function(e){var i=e.target,k=i.dataset.k;if(!k)return;if(i.type==='checkbox')pulse(i.parentNode.querySelector('.tk'));S[k]=i.type==='checkbox'?+i.checked:i.type==='range'?+i.value:i.value;ap()});
addEventListener('keydown',function(e){if(e.key==='Escape'&&P.classList.contains('on'))cl();else if((e.ctrlKey||e.metaKey)&&e.key===','){e.preventDefault();P.classList.contains('on')?cl():op()}},true);
B.insertAdjacentHTML('beforeend','<canvas id="amb"></canvas><div id="vgn"></div><div id="scn"></div>');
var AC=$('#amb'),ax=AC.getContext('2d'),ps=[],raf,rnd=Math.random;
window.AMB=function(){cancelAnimationFrame(raf);var k=S.amb;AC.width=innerWidth;AC.height=innerHeight;ax.clearRect(0,0,AC.width,AC.height);if(!k||RM||!S.anim)return;
 ps=[];for(var i=0;i<(k==='stars'?100:k==='fireflies'?28:55);i++)ps.push({x:rnd()*AC.width,y:rnd()*AC.height,r:rnd()*2.5+1,v:rnd()*.8+.3,p:rnd()*6.28});
 (function f(){ax.clearRect(0,0,AC.width,AC.height);var w=AC.width,h=AC.height;
 ps.forEach(function(p){p.p+=.02;
  if(k==='snow'){p.y+=p.v;p.x+=Math.sin(p.p)*.6;ax.fillStyle='rgba(255,255,255,.85)';ax.beginPath();ax.arc(p.x,p.y,p.r,0,6.3);ax.fill()}
  else if(k==='petals'){p.y+=p.v;p.x+=Math.sin(p.p)*1.1;ax.fillStyle='rgba(255,170,200,.8)';ax.save();ax.translate(p.x,p.y);ax.rotate(p.p);ax.beginPath();ax.ellipse(0,0,p.r*2.6,p.r*1.4,0,0,6.3);ax.fill();ax.restore()}
  else if(k==='bubbles'){p.y-=p.v;p.x+=Math.sin(p.p)*.5;ax.strokeStyle='rgba(140,200,255,.7)';ax.lineWidth=1.5;ax.beginPath();ax.arc(p.x,p.y,p.r*3,0,6.3);ax.stroke()}
  else if(k==='stars'){ax.fillStyle='rgba(255,255,255,'+(.3+.7*Math.abs(Math.sin(p.p)))+')';ax.fillRect(p.x,p.y,p.r,p.r)}
  else{p.x+=Math.sin(p.p*.7)*.7;p.y+=Math.cos(p.p*.5)*.7;ax.shadowBlur=16;ax.shadowColor='#ffe27a';ax.fillStyle='rgba(255,226,122,'+(.4+.6*Math.abs(Math.sin(p.p)))+')';ax.beginPath();ax.arc(p.x,p.y,p.r*1.4,0,6.3);ax.fill();ax.shadowBlur=0}
  if(p.y>h+10)p.y=-10;if(p.y<-10)p.y=h+10;if(p.x>w+10)p.x=-10;if(p.x<-10)p.x=w+10});raf=requestAnimationFrame(f)})()};
addEventListener('resize',function(){AMB()});
var cu=[],mx=-99,my=-99;for(var i=0;i<9;i++){var c=D.createElement('i');c.className='cu';c.style.setProperty('--i',i);B.appendChild(c);cu.push({e:c,x:-99,y:-99})}
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY},{passive:true});
(function mv(){cu.forEach(function(c,i){var t=i?cu[i-1]:{x:mx,y:my};c.x+=(t.x-c.x)*(i?.55:.3);c.y+=(t.y-c.y)*(i?.55:.3);c.e.style.transform='translate('+c.x+'px,'+c.y+'px)'});requestAnimationFrame(mv)})();
B.insertAdjacentHTML('beforeend','<div id="abg"></div><div id="tnt"></div><div id="ssv"><b>SANKAR.DEV ☕</b></div>');
var AU;function snd(t){if(!S.snd)return;try{AU=AU||new(window.AudioContext||window.webkitAudioContext)();var o=AU.createOscillator(),g=AU.createGain(),n=AU.currentTime,c={soft:['sine',620,.05,.12],retro:['square',880,.04,.08],type:['sawtooth',140,.06,.05]}[S.snd];o.type=c[0];o.frequency.value=c[1]*(t||1);g.gain.setValueAtTime(c[2],n);g.gain.exponentialRampToValueAtTime(.001,n+c[3]);o.connect(g);g.connect(AU.destination);o.start(n);o.stop(n+c[3]+.02)}catch(e){}}
addEventListener('keydown',function(){if(S.snd==='type')snd(.8+Math.random()*.5)});
addEventListener('click',function(e){snd(1);var k=S.clk;if(!k)return;var n=k==='ripple'?1:k==='emoji'?6:12;for(var i=0;i<n;i++){var c=D.createElement('i'),an=Math.random()*6.28,d=40+Math.random()*60;c.className='ck '+k;c.style.cssText='left:'+e.clientX+'px;top:'+e.clientY+'px;--dx:'+(k==='ripple'?0:Math.cos(an)*d)+'px;--dy:'+(k==='emoji'?-60-Math.random()*60:k==='ripple'?0:Math.sin(an)*d)+'px';if(k==='emoji')c.textContent=['✨','☕','🚀','💚','🐍','⭐'][i%6];B.appendChild(c);setTimeout(c.remove.bind(c),900)}});
addEventListener('mousemove',function(e){if(!S.mg)return;$$('.btn').forEach(function(b){var r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);b.style.translate=Math.hypot(dx,dy)<90?dx*.3+'px '+dy*.3+'px':''})},{passive:true});
window.TNT=function(){if(!S.st)return;var f=scrollY/Math.max(1,D.documentElement.scrollHeight-innerHeight);$('#tnt').style.background='hsl('+(f*300+20)+',90%,55%)'};addEventListener('scroll',TNT,{passive:true});
var SV=$('#ssv'),it,sx=50,sy=50,vx=2,vy=1.6,sr;
window.SW=function(){SV.classList.remove('on');cancelAnimationFrame(sr);clearTimeout(it);if(S.ss&&!RM)it=setTimeout(function(){SV.classList.add('on');var b=SV.firstChild;(function f(){var w=innerWidth-b.offsetWidth,h=innerHeight-b.offsetHeight;sx+=vx;sy+=vy;if(sx<0||sx>w)vx=-vx;if(sy<0||sy>h)vy=-vy;b.style.transform='translate('+sx+'px,'+sy+'px)';b.style.color='hsl('+((sx+sy)%360)+',90%,60%)';sr=requestAnimationFrame(f)})()},25000)};
['mousemove','keydown','touchstart','scroll','click'].forEach(function(n){addEventListener(n,function(){window.SW()},{passive:true})});
ap();
return{cycle:function(){S.tod=0;S.th=TH[(TH.indexOf(S.th)+1)%TH.length];ap()},accent:function(c){S.ac=c;ap()},open:op};
})();
})();

/* ---------- v21: offline 404 page (auto shows when the connection drops, auto hides when it returns) ---------- */
(function(){
var OF=document.createElement('div'),tm;OF.id='off';OF.setAttribute('role','alertdialog');OF.setAttribute('aria-live','assertive');OF.setAttribute('aria-label','You are offline');
OF.innerHTML='<div class="oc"><div class="o4" aria-hidden="true"><span>4</span><span class="oe">🔌</span><span>4</span></div><h2 class="oh">Page not found… you’re offline</h2><p class="op">Looks like your internet took a coffee break ☕<br>Check your Wi‑Fi or mobile data. This page comes back by itself the moment you’re connected — no refresh needed.</p><p class="ow"><i></i><i></i><i></i> <span id="ost">Waiting for connection</span></p><button type="button" class="btn k" id="orb">Try again</button><p class="ok2">✅ Back online!</p></div>';
document.body.appendChild(OF);
var st=OF.querySelector('#ost'),rb=OF.querySelector('#orb');
function show(){clearTimeout(tm);OF.classList.remove('ok');st.textContent='Waiting for connection';OF.classList.add('on');document.documentElement.style.overflow='hidden';document.title='Offline — Sankar'}
function hide(){if(!OF.classList.contains('on'))return;OF.classList.add('ok');document.title='Sankar — Python Developer';clearTimeout(tm);tm=setTimeout(function(){OF.classList.remove('on','ok');document.documentElement.style.overflow=''},1300)}
addEventListener('offline',show);addEventListener('online',hide);
rb.addEventListener('click',function(){if(navigator.onLine)hide();else{st.textContent='Still offline…';OF.classList.remove('shake');void OF.offsetWidth;OF.classList.add('shake')}});
if(!navigator.onLine)show();
})();
