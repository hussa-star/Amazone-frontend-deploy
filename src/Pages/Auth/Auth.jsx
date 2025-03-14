import React, { useState, useContext } from "react";
import classes from "./Auth.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utiility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/Dataprovider";
import { Type } from "../../Utiility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isloading, setIsloading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData);

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "signin") {
      setIsloading({ ...isloading, signIn: true });
      try {
        const userinfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        // console.log(userinfo.user);
        dispatch({
          type: Type.SET_USER,
          user: userinfo.user,
        });

        setIsloading({ ...isloading, signIn: false });
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsloading({ ...isloading, signIn: false });
      }
    } else {
      setIsloading({ ...isloading, signUp: true });
      try {
        const userinfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // console.log(userinfo);
        dispatch({
          type: Type.SET_USER,
          user: userinfo.user,
        });

        setIsloading({ ...isloading, signUp: false });
        navigate(navStateData?.state?.redirect || "/");
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsloading({ ...isloading, signUp: false });
      }
    }
  };

  return (
    <div className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign Up</h1>
        <small
          style={{
            padding: "5px",
            color: "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {navStateData?.state?.msg}
        </small>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.signup_button}
          >
            {isloading.signIn ? (
              <ClipLoader size={16} color="#000" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing up, you agree to our Terms of Service and Privacy Policy.
          You also consent to receiving account-related communications.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_register_button}
        >
          {isloading.signUp ? (
            <ClipLoader size={16} color="#000" />
          ) : (
            " Create your Amazon clone account"
          )}
        </button>
      </div>
    </div>
  );
}

export default Auth;

// import React, { useState } from "react";
// import classes from "./Auth.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../Utiility/firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
// import { ClipLoader } from "react-spinners";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const [isloading, setIsloading] = useState({ signIn: false, signUp: false });

//   const navigate = useNavigate();

//   const authHandler = async (e) => {
//     e.preventDefault();

//     if (e.target.name === "signin") {
//       setIsloading({ ...isloading, signIn: true });
//       try {
//         const userinfo = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         console.log(userinfo.user);

//         setIsloading({ ...isloading, signIn: false });
//         navigate("/");
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//         setIsloading({ ...isloading, signIn: false });
//       }
//     } else {
//       setIsloading({ ...isloading, signUp: true });
//       try {
//         const userinfo = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log(userinfo);

//         setIsloading({ ...isloading, signUp: false });
//         navigate("/");
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//         setIsloading({ ...isloading, signUp: false });
//       }
//     }
//   };

//   return (
//     <div className={classes.login}>
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//           alt="Amazon logo"
//         />
//       </Link>

//       <div className={classes.login_container}>
//         <h1>Sign Up</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <form>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="text"
//               id="email"
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//             />
//           </div>

//           <button
//             type="submit"
//             name="signin"
//             onClick={authHandler}
//             className={classes.signup_button}
//           >
//             {isloading.signIn ? (
//               <ClipLoader size={16} color="#000" />
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>
//         <p>
//           By signing up, you agree to our Terms of Service and Privacy Policy.
//           You also consent to receiving account-related communications.
//         </p>
//         <button
//           type="submit"
//           name="signup"
//           onClick={authHandler}
//           className={classes.login_register_button}
//         >
//           {isloading.signUp ? (
//             <ClipLoader size={16} color="#000" />
//           ) : (
//             " Create your Amazon clone account"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Auth;

// import React, { useState, useEffect } from "react";
// import classes from "./Auth.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../../Utiility/firebase";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { ClipLoader } from "react-spinners";
// import { useContext } from "react";
// import { DataContext } from "../../Components/DataProvider/Dataprovider";
// import { Type } from "../../Utiility/action.type";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isloading, setIsloading] = useState({ signIn: false, signUp: false });
//   const navigate = useNavigate();

//   const [, dispatch] = useContext(DataContext); // Access the dispatch function from context

//   useEffect(() => {
//     // Firebase Auth state listener to check if user is logged in
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch({
//           type: Type.SET_USER,
//           user: user, // Update the user in global state
//         });
//       } else {
//         dispatch({
//           type: Type.SET_USER,
//           user: null, // Reset user when logged out
//         });
//       }
//     });

//     // Cleanup listener on component unmount
//     return () => unsubscribe();
//   }, [dispatch]);

//   const authHandler = async (e) => {
//     e.preventDefault();

//     if (e.target.name === "signin") {
//       setIsloading({ ...isloading, signIn: true });
//       try {
//         const userinfo = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log(userinfo.user);

//         setIsloading({ ...isloading, signIn: false });
//         navigate("/");
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//         setIsloading({ ...isloading, signIn: false });
//       }
//     } else {
//       setIsloading({ ...isloading, signUp: true });
//       try {
//         const userinfo = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log(userinfo);

//         setIsloading({ ...isloading, signUp: false });
//         navigate("/");
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//         setIsloading({ ...isloading, signUp: false });
//       }
//     }
//   };

//   return (
//     <div className={classes.login}>
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//           alt="Amazon logo"
//         />
//       </Link>

//       <div className={classes.login_container}>
//         <h1>Sign Up</h1>
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <form>
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="text"
//               id="email"
//             />
//           </div>

//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//             />
//           </div>

//           <button
//             type="submit"
//             name="signin"
//             onClick={authHandler}
//             className={classes.signup_button}
//           >
//             {isloading.signIn ? (
//               <ClipLoader size={16} color="#000" />
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>
//         <p>
//           By signing up, you agree to our Terms of Service and Privacy Policy.
//           You also consent to receiving account-related communications.
//         </p>
//         <button
//           type="submit"
//           name="signup"
//           onClick={authHandler}
//           className={classes.login_register_button}
//         >
//           {isloading.signUp ? (
//             <ClipLoader size={16} color="#000" />
//           ) : (
//             " Create your Amazon clone account"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Auth;
