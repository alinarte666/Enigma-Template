import React from "react";
import { useCreateList } from "./useCreateList";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atom/userAtom"

export const UseLogin = () => {
  const [_, setCurrentUser] = useRecoilState(currentUserAtom);
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/auth/login"
  );
  const [messageError, setMessageError] = React.useState(false);
  const [createdList] = useCreateList();
  const createList = localStorage.getItem("createdList");

  

  const userLogin = async (dataUser, fun1, state) => {
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataUser),
      method: "POST",
    })
    .then((res) => res.json()) 
    .then((res) => {
        setCurrentUser(res)
        localStorage.setItem("token", res.accessToken);
        {res.message ? setMessageError(true) : '' }
        {state == true ? createdList(res.accessToken) : console.log("chale")}
        {res.accessToken ? fun1() : ''}
        
      })
    .catch(e => {
        console.log(e)              //Este catch no me funciona, no se porque              
        setMessageError(e.message)  //Creo que es un despiste del dev backend
      });
    
  };

  return [userLogin, messageError, setMessageError]; 
};
