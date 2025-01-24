const admin = require("firebase-admin");
const serviceAccount = require("./varahifarmsimages-firebase-adminsdk-fbsvc-d466d30076.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "varahifarmsimages.appspot.com", // Replace with your Firebase project storage bucket
});

const bucket = admin.storage().bucket();

module.exports = bucket;
