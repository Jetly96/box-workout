const BASE='https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
const E=(id,name,cat,desc)=>({id,name,cat,desc,imgs:[BASE+id+'/0.jpg',BASE+id+'/1.jpg'],sets:3,reps:10,rest:45});
const exercises=[
E('Dumbbell_Floor_Press','Floor Press','Petto','Sdraiato a terra: gomiti controllati, spingi i manubri sopra il petto.'),
E('Pushups','Push-up','Petto','Corpo in linea, petto verso terra, spingi senza perdere l’assetto.'),
E('Dumbbell_Bench_Press_with_Neutral_Grip','Floor Press presa neutra','Petto','Palmi rivolti tra loro; movimento controllato e spalle stabili.'),
E('Straight-Arm_Dumbbell_Pullover','Pullover con manubrio','Petto','Braccia quasi tese, porta il manubrio dietro la testa senza inarcare la schiena.'),
E('Dumbbell_Flyes','Floor Fly','Petto','Apri le braccia con gomiti morbidi e richiudi sopra il petto.'),
E('One_Arm_Dumbbell_Bench_Press','Floor Press unilaterale','Petto','Una spinta alla volta mantenendo il tronco fermo.'),
E('Dumbbell_Bicep_Curl','Curl','Braccia','Gomiti vicino al busto; muovi l’avambraccio senza slancio.'),
E('Alternate_Hammer_Curl','Hammer Curl','Braccia','Presa neutra, pollici verso l’alto, gomiti fermi.'),
E('Concentration_Curls','Concentration Curl','Braccia','Braccio appoggiato alla coscia, curl lento e controllato.'),
E('Reverse_Barbell_Curl','Reverse Curl','Braccia','Presa prona; usa carico leggero e polsi neutri.'),
E('Standing_One-Arm_Dumbbell_Triceps_Extension','Triceps Extension sopra testa','Braccia','Gomito rivolto avanti, estendi senza aprirlo lateralmente.'),
E('Close-Grip_Dumbbell_Press','Floor Press presa stretta','Braccia','Manubri vicini, gomiti aderenti al busto: focus tricipiti.'),
E('Side_Lateral_Raise','Alzate laterali','Spalle','Solleva lateralmente fino circa all’altezza delle spalle, senza slancio.'),
E('Front_Dumbbell_Raise','Alzate frontali','Spalle','Solleva davanti a te mantenendo il tronco fermo.'),
E('Alternating_Deltoid_Raise','Laterali/frontali alternate','Spalle','Alterna una ripetizione frontale e una laterale.'),
E('Dumbbell_One-Arm_Shoulder_Press','Shoulder Press un braccio','Spalle','Da seduto/in ginocchio nel box: spingi sopra la testa senza inarcare.'),
E('Dumbbell_Shrug','Shrug','Spalle','Eleva le spalle verticalmente; non ruotarle.'),
E('One-Arm_Dumbbell_Row','Rematore un braccio','Schiena','Schiena neutra; porta il gomito verso il fianco.'),
E('Bent_Over_Two-Dumbbell_Row','Rematore due manubri','Schiena','Busto inclinato e stabile; tira i gomiti indietro.'),
E('Straight-Arm_Dumbbell_Pullover','Pullover','Schiena','Controlla la discesa e usa dorsali e gran dentato nel ritorno.'),
E('Bodyweight_Squat','Squat corpo libero','Gambe','Scendi nel range comodo, ginocchia in linea con i piedi.'),
E('Dumbbell_Squat','Squat con manubri','Gambe','Manubri ai lati; scendi solo nel range confortevole.'),
E('Standing_Dumbbell_Calf_Raise','Calf Raise con manubri','Gambe','Sali sulle punte, pausa in alto e scendi lentamente.'),
E('Dumbbell_Lunges','Affondo statico','Gambe','Passo stabile; usa inizialmente un range ridotto e controllato.'),
E('Crunches','Crunch','Addome','Solleva le scapole senza tirare il collo e senza staccare la zona lombare.'),
E('Alternate_Heel_Touchers','Heel Taps','Addome','Spalle leggermente sollevate; raggiungi alternativamente i talloni.'),
E('Plank','Plank','Addome','Corpo in linea, addome contratto e bacino neutro.'),
E('Flat_Bench_Lying_Leg_Raise','Leg Raises','Addome','Solleva le gambe controllando la zona lombare; riduci il range se serve.')];
const cats=['Tutti','Petto','Braccia','Spalle','Schiena','Gambe','Addome']; let active='Tutti';
let selected=JSON.parse(localStorage.getItem('bwSelected')||'[]'); let settings=JSON.parse(localStorage.getItem('bwSettings')||'{}');
const $=s=>document.querySelector(s); const save=()=>{localStorage.setItem('bwSelected',JSON.stringify(selected));localStorage.setItem('bwSettings',JSON.stringify(settings))};
function renderCats(){ $('#cats').innerHTML=cats.map(c=>`<button class="pill ${c===active?'active':''}" data-cat="${c}">${c}</button>`).join(''); document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{active=b.dataset.cat;renderCats();renderGrid()})}
function card(x){return `<article class="card" data-id="${x.id}"><div class="poses"><img src="${x.imgs[0]}" alt="${x.name} posizione iniziale" loading="lazy"><img src="${x.imgs[1]}" alt="${x.name} posizione finale" loading="lazy"></div><div class="meta"><button class="add" data-add="${x.id}">${selected.includes(x.id)?'✓':'+'}</button><h3>${x.name}</h3><p>${x.desc}</p><span class="tag">3 × 10 · 45 s</span></div></article>`}
function renderGrid(){let list=active==='Tutti'?exercises:exercises.filter(x=>x.cat===active);$('#title').textContent=active==='Tutti'?'Tutti gli esercizi':active;$('#count').textContent=list.length+' esercizi';$('#grid').innerHTML=list.map(card).join('');document.querySelectorAll('.card').forEach(c=>c.onclick=e=>{if(e.target.dataset.add)return;openDetail(c.dataset.id)});document.querySelectorAll('[data-add]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggle(b.dataset.add)})}
function toggle(id){selected=selected.includes(id)?selected.filter(x=>x!==id):[...selected,id];save();renderGrid()}
function openDetail(id){const x=exercises.find(e=>e.id===id),s=settings[id]||x;$('#detailBody').innerHTML=`<h2>${x.name}</h2><p>${x.cat}</p><div class="detailPoses"><figure><img src="${x.imgs[0]}"><figcaption>1 · Posizione iniziale</figcaption></figure><figure><img src="${x.imgs[1]}"><figcaption>2 · Posizione finale</figcaption></figure></div><div class="detailText"><h3>Esecuzione</h3><p>${x.desc}</p><p><b>Regola:</b> movimento lento, niente slanci e interrompi se senti dolore articolare.</p></div><div class="controls"><label>Serie<input id="sets" type="number" value="${s.sets||3}" min="1"></label><label>Ripetizioni<input id="reps" type="number" value="${s.reps||10}" min="1"></label><label>Recupero (s)<input id="rest" type="number" value="${s.rest||45}" min="10"></label></div><button class="primary" id="detailAdd">${selected.includes(id)?'Rimuovi dall’allenamento':'Aggiungi all’allenamento'}</button>`;$('#detail').showModal();$('#detailAdd').onclick=()=>{settings[id]={sets:+$('#sets').value,reps:+$('#reps').value,rest:+$('#rest').value};toggle(id);$('#detail').close()}}
$('.close').onclick=()=>$('#detail').close();$('#reset').onclick=()=>{if(confirm('Vuoi azzerare allenamento e impostazioni?')){selected=[];settings={};save();renderGrid()}};
function workout(){let list=selected.map(id=>exercises.find(e=>e.id===id)).filter(Boolean);$('main').innerHTML=`<section class="worklist"><h1>Il mio allenamento</h1>${list.length?list.map((x,i)=>`<div class="workitem"><span><b>${i+1}. ${x.name}</b><br><small>${(settings[x.id]||x).sets} × ${(settings[x.id]||x).reps}</small></span><button class="pill" data-remove="${x.id}">Rimuovi</button></div>`).join(''):'<p>Non hai ancora aggiunto esercizi.</p>'}${list.length?'<button class="primary" id="start">Avvia allenamento guidato</button>':''}</section>`;document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{toggle(b.dataset.remove);workout()});if($('#start'))$('#start').onclick=()=>run(list,0,1)}
function run(list,idx,setNo){if(idx>=list.length){$('#runnerBody').innerHTML='<h1>Allenamento completato! 💪</h1><button class="primary" onclick="document.querySelector(\'#runner\').close()">Fine</button>';return}let x=list[idx],s=settings[x.id]||x;$('#runnerBody').innerHTML=`<h2>${x.name}</h2><p>Serie ${setNo} di ${s.sets} · ${s.reps} ripetizioni</p><img class="runnerImg" src="${x.imgs[1]}"><button class="primary" id="doneSet">Serie completata</button>`;$('#runner').showModal();$('#doneSet').onclick=()=>rest(list,idx,setNo,s)}
function rest(list,idx,setNo,s){let t=s.rest;$('#runnerBody').innerHTML=`<h2>Recupero</h2><div class="timer">${t}</div><p style="text-align:center">Prossima: ${setNo<s.sets?'serie '+(setNo+1):list[idx+1]?.name||'fine'}</p><button class="primary" id="skip">Salta recupero</button>`;let int=setInterval(()=>{t--;$('.timer').textContent=t;if(t<=0){clearInterval(int);next()}},1000);function next(){clearInterval(int);setNo<s.sets?run(list,idx,setNo+1):run(list,idx+1,1)}$('#skip').onclick=next}
$('.closeRunner').onclick=()=>$('#runner').close();
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{if(b.dataset.view==='workout')workout();else if(b.dataset.view==='home'||b.dataset.view==='exercises')location.reload();else alert('Progressi: verranno popolati dagli allenamenti completati.')});
renderCats();renderGrid();if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js');
