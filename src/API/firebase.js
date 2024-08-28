// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
// import "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBA9TqKvTe6ft5XUp4M21oEP93ErHfNlps",
//     authDomain: "workout-plan-b32b6.firebaseapp.com",
//     projectId: "workout-plan-b32b6",
//     storageBucket: "workout-plan-b32b6.appspot.com",
//     messagingSenderId: "722549756492",
//     appId: "1:722549756492:web:7091f8ed8e1767db519ae9",
//     measurementId: "G-EY28FMLE69",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = firebase.auth();

// export async function getData() {
//     let data = [];
//     let res = await getDocs(collection(db, "plans"));
//     res.docs.map((doc) => {
//         data.push(doc.data());
//     });
//     return data;
// }
