const MAKE_WEBHOOK_URL='https://hook.eu1.make.com/fxpzx79979fkhine73ro511n8m7r2c3g';
const menuBtn=document.querySelector('.menuBtn'),nav=document.querySelector('.nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const form=document.getElementById('booking-form');
if(form){const checks=[...form.querySelectorAll('input[name="services"]')],price=document.getElementById('estimate-price'),status=document.getElementById('form-status'),btn=document.getElementById('booking-submit');
const update=()=>{const total=checks.filter(x=>x.checked).reduce((s,x)=>s+Number(x.dataset.price||0),0);price.textContent=total?total.toLocaleString('ja-JP')+'円〜':'要見積もり';return total};checks.forEach(x=>x.addEventListener('change',update));
form.addEventListener('submit',async e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}const services=checks.filter(x=>x.checked).map(x=>x.value);if(!services.length){status.className='status error';status.textContent='希望サービスを1つ以上選んでください。';return}const fd=new FormData(form),payload={source:'oissu-clean-website',submitted_at:new Date().toISOString(),name:fd.get('name'),phone:fd.get('phone'),email:fd.get('email'),area:fd.get('area'),services,preferred_datetime_1:fd.get('preferred_datetime_1'),preferred_datetime_2:fd.get('preferred_datetime_2'),message:fd.get('message')||'',estimate_yen:update(),page_url:location.href};btn.disabled=true;btn.textContent='送信中…';try{const body=new URLSearchParams({
source:payload.source,
submitted_at:payload.submitted_at,
name:payload.name||'',
phone:payload.phone||'',
email:payload.email||'',
area:payload.area||'',
services:payload.services.join(' / '),
preferred_datetime_1:payload.preferred_datetime_1||'',
preferred_datetime_2:payload.preferred_datetime_2||'',
message:payload.message||'',
estimate_yen:String(payload.estimate_yen||''),
page_url:payload.page_url
});
await fetch(MAKE_WEBHOOK_URL,{method:'POST',mode:'no-cors',body});status.className='status success';status.textContent='送信しました。内容を確認して折り返しご連絡します。';form.reset();update()}catch(err){status.className='status error';status.textContent='送信に失敗しました。Instagram @oissu_99 へDMをお願いします。'}finally{btn.disabled=false;btn.textContent='無料見積もりを送信'}});update()}
