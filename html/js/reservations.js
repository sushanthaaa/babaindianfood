(function(){
  const form = document.getElementById('directReservationForm');
  if(!form) return;
  const branch = document.getElementById('resBranch');
  const date = document.getElementById('resDate');
  const time = document.getElementById('resTime');
  const msg = document.getElementById('reservationMsg');
  const btn = document.getElementById('reservationSubmitBtn');

  async function loadSlots(){
    if(!branch.value || !date.value) return;
    time.innerHTML = '<option value="">Loading...</option>';
    const res = await fetch(`/api/availability?branch=${encodeURIComponent(branch.value)}&date=${encodeURIComponent(date.value)}`);
    const data = await res.json();
    if(data.closed){
      time.innerHTML = '<option value="">Closed for this date</option>';
      return;
    }
    time.innerHTML = '<option value="">Select time</option>' + data.slots.map(s=>`<option value="${s}">${s}</option>`).join('');
  }

  branch.addEventListener('change', loadSlots);
  date.addEventListener('change', loadSlots);

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    msg.textContent = '';
    try{
      const payload = {
        branch: branch.value,
        date: date.value,
        time: time.value,
        partySize: document.getElementById('resPartySize').value,
        name: document.getElementById('resName').value,
        email: document.getElementById('resEmail').value,
        phone: document.getElementById('resPhone').value,
        notes: document.getElementById('resNotes').value
      };
      const res = await fetch('/api/reservations', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Unable to submit reservation');
      msg.textContent = `Reservation request received. Code: ${data.reservationCode}`;
      form.reset();
      time.innerHTML = '<option value="">Select branch and date first</option>';
    }catch(err){
      msg.textContent = err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit Reservation';
    }
  });
})();
