import React from 'react'

export const UseFetch = () => {
  const [data, setData] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const getData = () => {
    const param = `https://api-todos-prueba.onrender.com/api/v1/list/34/tasks`;
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
        setData(res);
        setLoading(false);
      });
  }


    return [data, loading, getData]
}
