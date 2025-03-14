import { useEffect, useState } from "react";
import "./App.css";
import Routering from "./Router";
import { useContext } from "react";
import { DataContext } from "./Components/DataProvider/Dataprovider";
import { Type } from "./Utiility/action.type";
import { auth } from "./Utiility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routering />
    </>
  );
}

export default App;
