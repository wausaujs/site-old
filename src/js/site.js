netlifyIdentity.on("init", (user) => console.log("init", user));
netlifyIdentity.on("login", (user) => {
  document
    .querySelectorAll(".rsvps button")
    .forEach((el) => el.classList.remove("hidden"));
});
netlifyIdentity.on("logout", () => {
  document
    .querySelectorAll(".rsvps button")
    .forEach((el) => el.classList.add("hidden"));
});
netlifyIdentity.on("error", (err) => console.error("Error", err));
netlifyIdentity.on("open", () => console.log("Widget opened"));
netlifyIdentity.on("close", () => console.log("Widget closed"));

const firebaseConfig = {
  apiKey: "AIzaSyCZj6v9eSanOWCfMESr0vyw5gTIzYLF9fc",
  authDomain: "wausaujs-ef9e0.firebaseapp.com",
  databaseURL: "https://wausaujs-ef9e0.firebaseio.com",
  projectId: "wausaujs-ef9e0",
  storageBucket: "wausaujs-ef9e0.appspot.com",
  messagingSenderId: "896413374922",
  appId: "1:896413374922:web:165f1b9d471a5148605733",
  measurementId: "G-71WBMG4KJD",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

db.collection("meetups").onSnapshot((snapshot) => {
  console.log(snapshot);
  snapshot.docChanges().forEach((change) => {
    const el = document.querySelector(
      `.card[data-id="${change.doc.id}"] .rsvp-names`
    );
    if (el) {
      el.textContent = change.doc.get("rsvp").join(", ");
    }
  });
});
