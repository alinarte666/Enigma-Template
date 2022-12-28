import React from "react";
import { useRecoilState } from "recoil";
import { currentListId } from "../../recoil/atom/useIdList";
import { currentUserTokenAtom } from "../../recoil/atom/useToken";

export const UseFetch = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [_, setIdList] = useRecoilState(currentListId);

  const getData = () => {

    const param = `https://api-todos-prueba.onrender.com/api/v1/list/`;
    
    fetch(param, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // setData(res[0].id);
        // console.log(res[0].id);
        localStorage.setItem("idList", res[0].id);
        setIdList(res[0].id);
        setLoading(false);
      });
 };

  return [data, loading, getData];
}

