import React from "react";

export default function useGetTask() {
  const [tasks, setTaks] = React.useState([]);

  const getTasks = (idList, token) => {
    const param = `https://api-todos-prueba.onrender.com/api/v1/list/${idList}/tasks`;
    console.log('id de la lista ' + idList);

    fetch(param, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setTaks(res);
        console.log(res);
      })
      .catch((error) => console.log({ error }));
  };
  return { tasks, getTasks };
}
