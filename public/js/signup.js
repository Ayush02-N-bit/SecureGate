function signupUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!name || !email || !password || !role) {
        alert("All fields are required");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return firebase.firestore().collection("users").doc(user.uid).set({
                name, email, role, createdAt: new Date()
            });
        })
        .then(() => {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        })
        .catch((error) => alert("Signup failed: " + error.message));
}
window.signupUser = signupUser;