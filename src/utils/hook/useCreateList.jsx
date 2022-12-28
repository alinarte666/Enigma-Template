import React from "react";
import { currentUserTokenAtom } from "../../recoil/atom/useToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentListId } from "../../recoil/atom/useIdList";

export const useCreateList = () => {
  const token = useRecoilValue(currentUserTokenAtom);
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/list/"
  );
  const [defaultValue, setDefaultValue] = React.useState({
    title: "Supermercado",
    keywords: ["carne", "lacteos", "verduras"],
  });
  const [_, setCurrentListId] = useRecoilState(currentListId);

  const createdList = () => {
    console.log(localStorage.getItem("token"))
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(defaultValue),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('lista creada correctament ' + res.list.title);
        localStorage.setItem("idList", res.list.id)
      }) 
      .catch((error) => console.log({ error }));
  };

  return [createdList];
};
