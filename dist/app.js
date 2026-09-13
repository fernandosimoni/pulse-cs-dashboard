const customers=[
 {name:'Vitta Saúde',segment:'Enterprise',score:31,mrr:'R$ 8.900',contact:'12 dias',risk:'Alto',owner:'Ana Lima',initials:'VS',color:'#e9efff'},
 {name:'Nexo Logística',segment:'Mid-market',score:38,mrr:'R$ 5.450',contact:'9 dias',risk:'Alto',owner:'Carlos Reis',initials:'NL',color:'#fff0e9'},
 {name:'Orbe Educação',segment:'Enterprise',score:46,mrr:'R$ 7.200',contact:'7 dias',risk:'Médio',owner:'Ana Lima',initials:'OE',color:'#f1eaff'},
 {name:'Lumina Tech',segment:'SMB',score:51,mrr:'R$ 2.850',contact:'5 dias',risk:'Médio',owner:'Marina Luz',initials:'LT',color:'#e7faf2'},
 {name:'Atlas Varejo',segment:'Mid-market',score:54,mrr:'R$ 4.100',contact:'6 dias',risk:'Médio',owner:'Carlos Reis',initials:'AV',color:'#fff6de'}
];
function renderRows(filter=''){
 const rows=customers.filter(c=>c.name.toLowerCase().includes(filter.trim().toLowerCase())).map(c=>`<tr><td><div class="client"><span class="avatar" style="background:${c.color}">${c.initials}</span><span><strong>${c.name}</strong><small>${c.segment}</small></span></div></td><td><span class="score">${c.score}<span class="score-bar"><i style="width:${c.score}%;background:${c.score<40?'#ff7b68':'#f2b84b'}"></i></span></span></td><td><strong>${c.mrr}</strong></td><td>${c.contact}</td><td><span class="tag ${c.risk==='Alto'?'high':'medium'}">${c.risk}</span></td><td><span class="owner"><i>${c.owner.split(' ').map(n=>n[0]).join('')}</i>${c.owner}</span></td></tr>`).join('');
 document.getElementById('customerRows').innerHTML=rows||'<tr><td colspan="6">Nenhum cliente corresponde à busca. Use Limpar busca para ver os cinco exemplos ou Importar CSV para carregar seus leads.</td></tr>';
}
renderRows();
document.getElementById('searchInput').addEventListener('input',e=>renderRows(e.target.value));

if (typeof Chart !== 'undefined') {
Chart.defaults.font.family='DM Sans';Chart.defaults.color='#7b889c';
const growthData={30:[201,210,219,225,239,248],90:[181,196,205,217,232,248],180:[154,171,188,207,228,248]};
const growthChart=new Chart(document.getElementById('growthChart'),{type:'line',data:{labels:['Abr','Mai','Jun','Jul','Ago','Set'],datasets:[{data:growthData[30],borderColor:'#5878ef',backgroundColor:'rgba(88,120,239,.09)',fill:true,tension:.4,pointRadius:3,pointBackgroundColor:'#fff',pointBorderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{displayColors:false}},scales:{x:{grid:{display:false},border:{display:false}},y:{beginAtZero:false,min:140,grid:{color:'#edf0f5'},border:{display:false},ticks:{stepSize:25}}}}});
new Chart(document.getElementById('healthChart'),{
 type:'doughnut',
 data:{datasets:[{data:[168,52,28],backgroundColor:['#37d69a','#f2b84b','#ff7b68'],borderWidth:0,spacing:3}]},
 options:{cutout:'76%',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>` ${c.raw} clientes`}}}}
});
document.getElementById('periodSelect').addEventListener('change',e=>{const d=growthData[e.target.value];growthChart.data.datasets[0].data=d;growthChart.update();const mods={30:['248','2,4%','72','94%'],90:['239','2,9%','69','92%'],180:['221','3,2%','66','91%']}[e.target.value];['activeCustomers','churnRate','npsScore','csatScore'].forEach((id,i)=>document.getElementById(id).textContent=mods[i]);});

} else { document.querySelectorAll('.chart-wrap,.donut-wrap').forEach(el=>{const note=document.createElement('p');note.textContent='Gráfico indisponível. Verifique sua conexão.';el.append(note);}); }

let imported = null;
const search = document.getElementById('searchInput');
const status = document.getElementById('csvStatus');
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const originalHead = document.querySelector('thead').innerHTML;
function parseCSV(text) {
 text = text.replace(/^\uFEFF/, '');
 const first = text.split(/\r?\n/)[0];
 const counts = [',',';','\t'].map(d => [d, (first.match(new RegExp(d === '\t' ? '\t' : d, 'g')) || []).length]);
 const delimiter = counts.sort((a,b)=>b[1]-a[1])[0][0];
 const rows=[]; let row=[], cell='', quoted=false;
 for(let i=0;i<text.length;i++) {
  const c=text[i];
  if(c==='"') { if(quoted && text[i+1]==='"'){cell+='"';i++;}else if(quoted || !cell){quoted=!quoted;}else{cell+=c;} }
  else if(c===delimiter && !quoted){row.push(cell);cell='';}
  else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell='';}
  else cell+=c;
 }
 if(quoted)throw new Error('Há aspas sem fechamento no CSV. Revise o arquivo.');
 row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
 if(rows.length<2)throw new Error('O arquivo precisa de cabeçalhos e pelo menos um lead.');
 const headers=rows.shift().map((v,i)=>v.trim()||`Coluna ${i+1}`);
 if(rows.some(r=>r.length!==headers.length))throw new Error('Há linhas com quantidade diferente de colunas. Confira o separador e as aspas do CSV.');
 return {headers,rows};
}
function renderImported(){
 if(!imported)return;
 const term=search.value.trim().toLocaleLowerCase('pt-BR');
 const rows=imported.rows.filter(row=>row.some(v=>v.toLocaleLowerCase('pt-BR').includes(term)));
 document.querySelector('thead').innerHTML='<tr>'+imported.headers.map(h=>'<th>'+escapeHTML(h)+'</th>').join('')+'</tr>';
 document.getElementById('customerRows').innerHTML=rows.length?rows.map(row=>'<tr>'+row.map(v=>'<td>'+escapeHTML(v)+'</td>').join('')+'</tr>').join(''):`<tr><td colspan="${imported.headers.length}">Nenhum lead corresponde à busca. Use Limpar busca para ver todos.</td></tr>`;
 status.textContent=`${rows.length} de ${imported.rows.length} leads. Arquivo carregado apenas nesta sessão; ao atualizar a página, importe novamente.`;
}
search.addEventListener('input',()=>{if(imported)renderImported();});
document.getElementById('clearSearch').addEventListener('click',()=>{search.value='';if(imported)renderImported();else renderRows();});
document.getElementById('importBtn').addEventListener('click',()=>document.getElementById('csvInput').click());
document.getElementById('csvInput').addEventListener('change',async e=>{
 const file=e.target.files[0];if(!file)return;
 try{
  if(file.size>5*1024*1024)throw new Error('Use um CSV de até 5 MB.');
  const bytes=await file.arrayBuffer();let contents=new TextDecoder('utf-8').decode(bytes);
  if(contents.includes('\uFFFD'))contents=new TextDecoder('windows-1252').decode(bytes);
  const parsed=parseCSV(contents);
  if(parsed.rows.length>10000)throw new Error('Use até 10.000 leads por arquivo.');
  imported=parsed;search.value='';
  document.querySelector('.risk-panel h2').textContent='Leads importados';
  document.querySelector('.risk-panel .panel-head p').textContent='Colunas originais do seu CSV';
  document.querySelectorAll('.kpis,.grid-two,.sla-panel').forEach(el=>el.hidden=true);
  document.querySelector('.grid-bottom').style.gridTemplateColumns='1fr';
  document.getElementById('periodSelect').disabled=true;
  document.getElementById('demoBtn').hidden=false;
  document.querySelector('footer').textContent='Dados do CSV processados no seu navegador. Indicadores de demonstração ocultos: uma lista de leads não permite calcular churn, NPS ou CSAT.';
  renderImported();
 }catch(error){status.textContent=error.message;}
 e.target.value='';
});
document.getElementById('demoBtn').addEventListener('click',()=>location.reload());
document.querySelector('.ghost').addEventListener('click',()=>document.getElementById('customers').scrollIntoView({behavior:'smooth'}));
document.getElementById('exportBtn').addEventListener('click',()=>{
 const rows=imported?[imported.headers,...imported.rows]:[['Cliente','Segmento','Health Score','MRR','Último contato','Risco','Responsável'],...customers.map(c=>[c.name,c.segment,c.score,c.mrr,c.contact,c.risk,c.owner])];
 const quote=value=>'"'+String(value).replace(/^[=+@\t\r-]/,"'$&").replace(/"/g,'""')+'"';
 const csv='\uFEFF'+rows.map(row=>row.map(quote).join(';')).join('\r\n');
 const a=document.createElement('a');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 a.href=url;a.download=imported?'leads.csv':'clientes-demonstracao.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 status.textContent='Download solicitado. Confira a pasta Downloads do navegador.';
});
