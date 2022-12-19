import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
  LoadingIcon,
} from "@/base-components";
import { useState, useEffect } from "react";
import classnames from "classnames";
import { Formcito } from "../../components/Formcito/Formcito";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newData, setNewData] = useState({
    title: "",
    completed: false,
  });
  const [counter, setCounter] = useState(1);
  const [masterData, setMasterData] = useState([]);
  const [dataLocal, setDataLocal] = useState({});
  const [idTask, setIdTask] = useState("");
  const [error, setError] = useState(
    "Tu tarea debe contener mas 3 caracteres"
  );
  const [loading, setLoading] = useState(true);

  const [viewEdit, setViewEdit] = useState(false);

  useEffect(() => {
    getData();
    console.log(counter);
  }, [counter]);

  useEffect(() => {
    setDataLocal(dataLocal);
  }, [dataLocal]);

  const getIdTask = (id) => {
    setDeleteConfirmationModal(true);
    setIdTask(id);
  };

  const changeView = (id) => {
    setDataLocal(masterData.filter((x) => x.id == id));
    setViewEdit(true);
  };

  const refreshUi = () => setCounter(counter + 1);
  const clearForm = () => setNewData({ title: "", completed: false });

  const changeViewTwo = () => setViewEdit(false);

  const sendDb = () => {
    const param = `https://api-todos-prueba.onrender.com/api/v1/list/34/tasks`;
    if (newData.title !== "") {
      fetch(param, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(newData),
        method: "POST",
      })
        .then((res) => {
          console.log(res.statusText);
          refreshUi();
          clearForm();
        })
        .catch((error) => console.log({ error }));

      setShowModal(false);
    } else {
      setError("Tu tarea no debe estar vacia");
    }
  };

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
        setMasterData(res);
        setLoading(false);
      });
  };

  const deleteTask = (taskId) => {
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
    refreshUi();
    setDeleteConfirmationModal(false);
  };

  const handleChange = ({ target: { name, value } }) =>
    setNewData({ ...newData, [name]: value });

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Data List Layout
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-5 relative">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2 relative -z-40">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
          <Dropdown>
            <DropdownToggle className="btn px-2 box">
              <span className="w-5 h-5 flex items-center justify-center">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="w-40">
              <DropdownContent>
                <DropdownItem>
                  <Lucide icon="Printer" className="w-4 h-4 mr-2" />{" "}
                  Print
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" />{" "}
                  Export to Excel
                </DropdownItem>
                <DropdownItem>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" />{" "}
                  Export to PDF
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          <div className=" mx-auto text-slate-500 ">
            Showing 1 to 10 of 150 entries
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible relative py-4">
          {loading ? (
            <div className="border-2 w-full h-[80px] flex justify-center items-center">
              <LoadingIcon icon="tail-spin" className="w-8 h-8" />
            </div>
          ) : (
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">TITLE</th>
                  <th className="text-center whitespace-nowrap">
                    STATUS
                  </th>
                  <th className="text-center whitespace-nowrap">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {masterData.map((item, index) => (
                  <tr key={index} className="intro-x">
                    <td>
                      <a
                        href=""
                        className="font-medium whitespace-nowrap"
                      >
                        {item.title}
                      </a>
                    </td>
                    <td className="w-40">
                      <div
                        className={classnames({
                          "flex items-center justify-center": true,
                          "text-success": item.completed,
                          "text-danger": !item.completed,
                        })}
                      >
                        <Lucide
                          icon="CheckSquare"
                          className="w-4 h-4 mr-2"
                        />
                        {item.completed ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="table-report__action w-56">
                      <div className="flex justify-center items-center">
                        <a
                          className="flex items-center mr-3"
                          href="#"
                          onClick={() => changeView(item.id)}
                        >
                          <Lucide
                            icon="CheckSquare"
                            className="w-4 h-4 mr-1"
                          />{" "}
                          Edit
                        </a>
                        <a
                          className="flex items-center text-danger"
                          href="#"
                          onClick={() => getIdTask(item.id)}
                        >
                          <Lucide
                            icon="Trash2"
                            className="w-4 h-4 mr-1"
                          />{" "}
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {viewEdit && (
            <Formcito
              saySome={changeViewTwo}
              task={dataLocal}
              refreshUi={refreshUi}
            />
          )}
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronLeft" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronRight" className="w-4 h-4" />
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <Lucide icon="ChevronsRight" className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>

        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={() => deleteTask(idTask)}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}

      {/* BEGIN: Add Task Modal */}
      <Modal
        show={showModal}
        onHidden={() => {
          setShowModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <h1 className="text-left hidden text-lg">
              Agrega tu Tarea
            </h1>
            <form>
              <label className="flex flex-col gap-2 items-center text-[25px] w-full">
                Title:
                <input
                  type="text"
                  name="title"
                  className="bg-transparent outline-none border-b-2 "
                  value={newData.title}
                  onChange={handleChange}
                />
              </label>
              <div className="mt-3 text-[25px]">
                <label>Completed:</label>
                <div className="form-switch mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={(e) =>
                      setNewData({
                        ...newData,
                        completed: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          {newData.title.length < 4 && (
            <span className="text-red-700 block text-center pb-2 text-sm">
              {error}
            </span>
          )}
          <div className="px-5 pb-8 text-center flex justify-center gap-2 ">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
              }}
              className="btn btn-danger w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success w-24"
              onClick={sendDb}
            >
              Save
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Add Task Modal */}
    </>
  );
}

export default Main;
