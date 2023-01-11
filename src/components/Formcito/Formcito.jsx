import React from "react";
import {Modal, ModalBody} from '@/base-components'

export const Formcito = ({ task, viewEdit, setViewEdit, refreshUi, setSuccessModal}) => {
  const [newData, setNewData] = React.useState(task[0]);
  const [idTask, setIdTask] = React.useState("");

  React.useEffect(() => {
    setIdTask(task[0].id);
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setNewData({ ...newData, [name]: value }); //id: task[0].id

  const handleSubmit = () => {
    const idLista = localStorage.getItem("idcito");
    console.log(idLista);
    fetch(`https://api-todos-prueba.onrender.com/api/v1/list/${idLista}/tasks/${idTask}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: `${newData.title}`,
        completed: `${newData.completed}`,
      }),
      method: "PATCH",
    }).then((res) => {
      console.log(res);
      setSuccessModal(true)
      refreshUi();
    })
    .catch(e => console.log({e}))
    setViewEdit(false);
  };

  return (
    <Modal 
      show={viewEdit}
      onHidden={() => setViewEdit(false)}
    >
      <ModalBody>
      <div className="w-auto h-auto flex justify-center items-center">
      <form className="intro-y p-5 flex flex-col gap-1">
        <div>
          <label htmlFor="crud-form-1" className="form-label">
            Title
          </label>
          <input
            id="crud-form-1"
            name="title"
            value={newData.title}
            onChange={handleChange}
            type="text"
            className="form-control w-full"
            autoFocus={true}
          />
        </div>

        <div className="mt-3">
          <label>Active Status</label>
          <div className="form-switch mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="status"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  completed: e.target.checked ? true : false,
                })
              }
              defaultChecked={newData.completed}
            />
          </div>
        </div>
        <div className="text-right mt-5 flex justify-around">
          <button
            type="button"
            className="btn btn-outline-secondary w-24 mr-1"
            onClick={() => setViewEdit(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary w-24"
            onClick={() => handleSubmit(idTask)}
          >
            Save
          </button>
        </div>
      </form>
      </div>
      </ModalBody>
    </Modal>
  );
};
