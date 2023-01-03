import React from "react";
import { useCreateList } from "./useCreateList";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atom/userAtom"

export const UseLogin = () => {
  const [_, setCurrentUser] = useRecoilState(currentUserAtom);
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/auth/login"
  );
  const [messageError, setMessageError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [createdList] = useCreateList();
  const createList = localStorage.getItem("createdList");

  const userLogin = (dataUser, fun1, state) => {
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
        console.log(res);
        setCurrentUser(res)
        localStorage.setItem("token", res.accessToken);
        {
          state == true
            ? createdList(res.accessToken)
            : console.log("chale");
        }
        fun1();
      })
      .catch((error) => {
        console.log(error.message + " error catch");
        setMessageError(error.message);
      });
  };

  // const userLogin2 = async(dataUser, fun1, state) => {
  //   try {
  //     const response = await fetch(url, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(dataUser),
  //       method: "POST",
  //     })
  //     const newResponse = await response.json();
  //     console.log(newResponse);
  //     setCurrentUser(newResponse)
  //     localStorage.setItem("token", newResponse.accessToken);
  //     {
  //       state == true
  //         ? createdList(newResponse.accessToken)
  //         : console.log("chale");
  //     }
  //     fun1();
  //   } catch (error) {
  //     console.log(error.message + " error catch");
  //       setMessageError(error.message);
  //   }
  // }

  return [userLogin, success]; //userLogin, 
};
