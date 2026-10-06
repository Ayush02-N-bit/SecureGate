const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }
    const userRecord = await admin.auth().createUser({ email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").doc(userRecord.uid).set({
      name, email, role, password: hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.status(201).json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return res.status(404).json({ message: "User not found" });
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", role: userData.role, uid: userDoc.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});