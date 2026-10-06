function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return firebase.firestore().collection("users").doc(user.uid).get();
        })
        .then((docSnap) => {
            if (docSnap && docSnap.exists) {
                const userData = docSnap.data();
                if (userData.role === "admin") window.location.href = "admin.html";
                else if (userData.role === "resident") window.location.href = "resident-dashboard.html";
                else if (userData.role === "guard") window.location.href = "guard-dashboard.html";
                else alert("Unknown user role.");
            } else alert("User data not found.");
        })
        .catch((error) => alert("Login failed: " + error.message));
}
window.loginUser = loginUser;