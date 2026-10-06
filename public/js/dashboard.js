const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
AOS.init({ duration: 800 });

auth.onAuthStateChanged(async (user) => {
    if (!user) window.location.href = "index.html";
    else {
        const doc = await db.collection("users").doc(user.uid).get();
        const data = doc.data();
        if (data) {
            document.getElementById("userInfo").innerText = "Welcome, " + data.name + " (" + data.role + ")";
            if (data.role === "admin") document.getElementById("adminPanelLink").style.display = "block";
        }
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    sidebar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}

function logout() {
    auth.signOut().then(() => { window.location.href = "index.html"; });
}
window.logout = logout;