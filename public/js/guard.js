function showTab(tabId) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    if (window.innerWidth < 900) document.getElementById("sidebar").classList.remove("active");
}
function toggleSidebar() { document.getElementById("sidebar").classList.toggle("active"); }

db.collection("complaints").onSnapshot(snapshot => {
    const container = document.getElementById("complaintList");
    if (!container) return;
    container.innerHTML = "";
    snapshot.forEach(doc => {
        const data = doc.data();
        container.innerHTML += `<div class="card"><p>${data.text}</p></div>`;
    });
});