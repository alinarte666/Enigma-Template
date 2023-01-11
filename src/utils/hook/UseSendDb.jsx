import React from "react";

export const UseSendDb = () => {
  const [newData, setNewData] = React.useState({
    title: "",
    completed: false,
  });
  const [errorMessa, setErrorMessa] = React.useState(
    "Tu tarea debe contener mas 3 caracteres"
  );
  const [showModal, setShowModal] = React.useState(false);
  
  const handleChange = ({ target: { name, value } }) =>
    setNewData({ ...newData, [name]: value });

  const clearForm = () => setNewData({ title: "", completed: false });

  const send = (firstF, seconF) => {
    const idLista = localStorage.getItem("idcito");
    console.log(idLista)
    if (newData.title !== "" && newData.title.length > 2) {
      fetch(
        `https://api-todos-prueba.onrender.com/api/v1/list/${idLista}/tasks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(newData),
          method: "POST",
        }
      )
        .then((res) => {
          console.log(res.statusText);
          firstF();
          seconF();
          clearForm();
        })
        .catch((error) => console.log({ error }));

      setShowModal(false);
    } else {
      setErrorMessa("Tu tarea no debe estar vacia");
    }
  };
  return {
    newData,
    setNewData,
    handleChange,
    errorMessa,
    showModal,
    setShowModal,
    send,
  };
};
