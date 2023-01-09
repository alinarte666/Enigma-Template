import React from "react";

export const Formcito = ({ task, saySome, refreshUi }) => {
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
      refreshUi();
    })
    .catch(e => console.log({e}))
    saySome();
  };

  return (
    <div className="w-[500px] h-[600px] absolute z-50 left-[25%] -top-[160px] flex flex-col  justify-around items-center">
      <form className="intro-y  box p-5">
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
            autoFocus='true'
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
        <div className="text-right mt-5">
          <button
            type="button"
            className="btn btn-outline-secondary w-24 mr-1"
            onClick={saySome}
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
  );
};
