auth.onAuthStateChanged(async (user) => {
    if (!user) return window.location.href = "login.html";
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();
    if (userData.role !== "resident") {
        alert("Access Denied");
        return window.location.href = "index.html";
    }
    document.getElementById("welcome").innerText = "Welcome, " + userData.name;
    document.getElementById("profileInfo").innerText = "Name: " + userData.name + " | Flat: " + userData.flat;
    loadVisitors(user.uid);
    loadStats(user.uid);
});
function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    if (window.innerWidth < 900) document.getElementById("sidebar").classList.remove("active");
}
function toggleSidebar() { document.getElementById("sidebar").classList.toggle("active"); }
function loadVisitors(residentId) {
    db.collection("visitors").where("residentId", "==", residentId).onSnapshot(snapshot => {
        const container = document.getElementById("requestsContainer");
        container.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            container.innerHTML += `<div class="card"><h3>${data.visitorName}</h3><p>Phone: ${data.phone}</p><p>Purpose: ${data.purpose}</p><p>Status: <strong>${data.status}</strong></p>${data.status === "pending" ? `<button class="approve-btn" onclick="updateStatus('${doc.id}','approved')">Approve</button><button class="reject-btn" onclick="updateStatus('${doc.id}','rejected')">Reject</button>` : ''}</div>`;
        });
    });
}
function updateStatus(id, status) { db.collection("visitors").doc(id).update({ status }); }
function loadStats(residentId) {
    db.collection("visitors").where("residentId", "==", residentId).onSnapshot(snapshot => {
        let total = snapshot.size, pending = 0;
        snapshot.forEach(doc => { if (doc.data().status === "pending") pending++; });
        document.getElementById("totalVisitors").innerText = total;
        document.getElementById("pendingVisitors").innerText = pending;
    });
}
function submitComplaint() {
    const text = document.getElementById("complaintText").value;
    if (!text) return alert("Enter complaint");
    db.collection("complaints").add({ text, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    alert("Complaint Submitted");
    document.getElementById("complaintText").value = "";
}
function logout() { auth.signOut().then(() => window.location.href = "index.html"); }