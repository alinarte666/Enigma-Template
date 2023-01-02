import React from "react";
import { useCreateList } from "./useCreateList";

export const UseLogin = () => {
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/auth/login"
  );
  const [createdList] = useCreateList();
  const createList = localStorage.getItem("createdList");

  const userLogin = (dataUser, fun1, state) => {
    console.log(dataUser)
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
        localStorage.setItem("token", res.accessToken);
        {state == true ? createdList(res.accessToken) : console.log('ni pedo man')}
        fun1()
      })
      .catch((error) => console.log({ error }));
  };

  return [userLogin];
};
