import React from "react";

export const useCreateList = () => {
  const [url, setUrl] = React.useState(
    "https://api-todos-prueba.onrender.com/api/v1/list/"
  );
  const [defaultValue, setDefaultValue] = React.useState({
    title: "Supermercado",
    keywords: ["carne", "lacteos", "verduras"],
  });
  
  const createdList = (token) => {
    console.log(token)
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(defaultValue),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('lista creada correctament ' + res.list.title);
        
      }) 
      .catch((error) => console.log({ error }));
  };

  return [createdList];
};
