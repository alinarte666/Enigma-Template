import React from 'react'

export const UseDelete = () => {
    const [deleteConfirmationModal, setDeleteConfirmationModal] = React.useState(false);

    const deleteTask = (taskId, firstF) => {
        const param = `https://api-todos-prueba.onrender.com/api/v1/list/34/tasks/${taskId}`;
        fetch(param, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((res) => console.log(res));
        firstF();
        setDeleteConfirmationModal(false);
      };

    return [deleteConfirmationModal, setDeleteConfirmationModal, deleteTask]
}
