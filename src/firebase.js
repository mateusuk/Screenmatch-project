import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt0dAnqiWoAwqsPkEjGvGXW6tJgPFAQpQ",
  authDomain: "screenmatch-d4b8e.firebaseapp.com",
  projectId: "screenmatch-d4b8e",
  storageBucket: "screenmatch-d4b8e.firebasestorage.app",
  messagingSenderId: "495792484806",
  appId: "1:495792484806:web:f4ada17ee92dcb847502c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email,password)=>{

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In:", userCredential.user);
      } catch (error) {
        console.error("Erro ao autenticar:", error.code, error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
      }

    // try {
    //     signInWithEmailAndPassword(auth,email,password);
    // } catch (error) {
    //     console.log(error);
    //     alert(error);
        
    // }
}

const logout = ()=>{
    signOut(auth);
}

export{auth,db,login,signup,logout};