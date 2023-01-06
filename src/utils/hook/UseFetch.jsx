import React from "react";

export const UseFetch = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const getTasks = (listId, tokenc) => {
    
    localStorage.setItem("idcito", listId);
    console.log('mi tokencito getTasks ' + tokenc)
    console.log('id de la lista ' + listId);


    fetch(`https://api-todos-prueba.onrender.com/api/v1/list/${listId}/tasks`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: tokenc,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((error) => console.log({ error }));
  };

  const getData = () => {
    const myToken = localStorage.getItem("token");
    
   fetch('https://api-todos-prueba.onrender.com/api/v1/list/', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: myToken,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        getTasks(res[0].id, myToken);
        console.log(res);
        setLoading(false);
      });   
 };

  return [data, loading, getData];
}

