let currentUser = null;

netlifyIdentity.on("login", (user) => {
  currentUser = user.user_metadata.full_name;

  document
    .querySelectorAll(".rsvps button")
    .forEach((el) => el.classList.remove("hidden"));
});
netlifyIdentity.on("logout", () => {
  currentUser = null;

  document
    .querySelectorAll(".rsvps button")
    .forEach((el) => el.classList.add("hidden"));
});
netlifyIdentity.on("error", (err) => console.error("Error", err));

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

// get all meetups from firestore and update the dom
db.collection("meetups").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const el = document.querySelector(
      `.card[data-id="${change.doc.id}"] .rsvp-names`
    );
    if (el) {
      el.textContent = change.doc.get("rsvp").join(", ");
    }
  });
});

// wire up rsvp buttons
document.querySelectorAll(".rsvps button").forEach((el) => {
  el.addEventListener("click", async (e) => {
    const ref = db.doc(`meetups/${e.target.getAttribute("data-id")}`);
    const doc = await ref.get();
    const action =
      doc.exists && doc.get("rsvp").includes(currentUser)
        ? "arrayRemove"
        : "arrayUnion";

    ref.set(
      {
        rsvp: firebase.firestore.FieldValue[action](currentUser),
      },
      { merge: true }
    );
  });
});
