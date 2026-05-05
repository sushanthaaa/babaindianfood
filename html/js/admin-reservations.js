async function api(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, credentials: 'include', ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function loadSession() {
  const s = await api('/api/admin/session');
  document.getElementById('loginCard').style.display = s.authenticated ? 'none' : 'block';
  document.getElementById('adminPanel').style.display = s.authenticated ? 'block' : 'none';
  if (s.authenticated) {
    await Promise.all([loadReservations(), loadClosures()]);
  }
}

async function loadReservations() {
  const data = await api('/api/admin/reservations');
  const body = document.getElementById('reservationRows');
  body.innerHTML = data.reservations.map(r => `<tr><td>${r.reservation_code}</td><td>${r.branch}</td><td>${r.reservation_date.slice(0,10)}</td><td>${r.reservation_time}</td><td>${r.party_size}</td><td>${r.customer_name}</td><td>${r.customer_phone}</td><td>${r.status}</td><td><select onchange="updateStatus(${r.id},this.value)"><option ${r.status==='pending'?'selected':''}>pending</option><option ${r.status==='confirmed'?'selected':''}>confirmed</option><option ${r.status==='cancelled'?'selected':''}>cancelled</option><option ${r.status==='completed'?'selected':''}>completed</option></select></td></tr>`).join('');
}

async function updateStatus(id, status) {
  await api('/api/admin/reservations', { method: 'PATCH', body: JSON.stringify({ id, status }) });
  await loadReservations();
}
window.updateStatus = updateStatus;

async function loadClosures() {
  const data = await api('/api/admin/closures');
  const list = document.getElementById('closureList');
  list.innerHTML = data.closures.map(c => `<li>${c.branch} - ${c.closed_date.slice(0,10)} (${c.reason || ''}) <button onclick="removeClosure('${c.branch}','${c.closed_date.slice(0,10)}')">Remove</button></li>`).join('');
}

async function removeClosure(branch, date) {
  await api('/api/admin/closures', { method: 'DELETE', body: JSON.stringify({ branch, date }) });
  await loadClosures();
}
window.removeClosure = removeClosure;

document.getElementById('adminLoginBtn').addEventListener('click', async () => {
  try {
    await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email: document.getElementById('adminEmail').value.trim(), password: document.getElementById('adminPassword').value }) });
    document.getElementById('loginMsg').textContent = 'Login successful';
    await loadSession();
  } catch (e) { document.getElementById('loginMsg').textContent = e.message; }
});

document.getElementById('addClosureBtn').addEventListener('click', async () => {
  await api('/api/admin/closures', { method: 'POST', body: JSON.stringify({ branch: document.getElementById('closureBranch').value, date: document.getElementById('closureDate').value, reason: document.getElementById('closureReason').value }) });
  await loadClosures();
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await api('/api/admin/logout', { method: 'POST' });
  await loadSession();
});

loadSession();
