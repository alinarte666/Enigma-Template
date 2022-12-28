import React from "react";
import { useRecoilState } from "recoil";
import { currentUserTokenAtom } from "../../recoil/atom/useToken";

export const UseLogin = () => {
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/auth/login"
  );
  const [_, setCurrentTokenUser] = useRecoilState(
    currentUserTokenAtom
  );

  const userLogin = (dataUser) => {
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
      })
      .catch((error) => console.log({ error }));
  };

  return [userLogin];
};
