import React from "react";
import { useRecoilValue } from "recoil";
import {currentListId} from '../../recoil/atom/useIdList'

export default function useGetTask() {
  const [tasks, setTaks] = React.useState([]);
  const ILista = useRecoilValue(currentListId)

  const getTasks = (idList) => {
    const param = `https://api-todos-prueba.onrender.com/api/v1/list/${idList}/tasks`;
    console.log(localStorage.getItem("token") )
    console.log(param);
    console.log(ILista)
    fetch(param, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setTaks(res))
      .catch((error) => console.log({ error }));
  };
  return [tasks, getTasks];
}
