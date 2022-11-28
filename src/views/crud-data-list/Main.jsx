import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
} from "@/base-components";
import { useState } from "react";
import classnames from "classnames";
import { useRecoilValue, useRecoilState } from "recoil";
import { todoListAtom } from "../../recoil/atom/todoAtom";
import React from "react";
import { Formcito } from "../../recoil/Formcito";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const todoLis = useRecoilValue(todoListAtom);
  const [_, setTodoList] = useRecoilState(todoListAtom);
  const [task, setTask] = useState("");
  const [idG, setIdG] = React.useState('')

  const removeTodo = (id) => {
    setDeleteConfirmationModal(false);
    const todoListFilters = todoLis.filter(
      (item, index) => item.id !== id
    );
    setTodoList(todoListFilters);
  };

  const activeView = (id) => {
    editTask(id)
    setViewEdit(true);
  };

  const editTask = (id) => {
    const tareita = todoLis.filter((item) => item.id == id);
    setTask(tareita);
  };

  const saySome = () => {
    setViewEdit(false);
  };

  const sayHello = (id) => {
    setDeleteConfirmationModal(true);
    setIdG(id)
  };

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">
        Data List Layout
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 border flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button className="btn btn-primary shadow-md mr-2 ">
            Add New Product
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
          <div className="w-full  sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
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
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">IMAGES</th>
                <th className="whitespace-nowrap">PRODUCT NAME</th>
                <th className="text-center whitespace-nowrap">
                  STOCK
                </th>
                <th className="text-center whitespace-nowrap">
                  STATUS
                </th>
                <th className="text-center whitespace-nowrap">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {todoLis.map((item, index) => (
                <tr key={index} className="intro-x">
                  <td className="w-40"></td>
                  <td>
                    <a
                      href=""
                      className="font-medium whitespace-nowrap"
                    >
                      {item.productName}
                    </a>
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                      {item.cate}
                    </div>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="w-40">
                    <div
                      className={classnames({
                        "flex items-center justify-center": true,
                        "text-success": item.status,
                        "text-danger": !item.status,
                      })}
                    >
                      <Lucide
                        icon="CheckSquare"
                        className="w-4 h-4 mr-2"
                      />
                      {item.status ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="table-report__action w-56">
                    <div className="flex justify-center items-center">
                      <a
                        className="flex items-center mr-3"
                        href="#"
                        onClick={() => activeView(item.id)}
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
                        onClick={() => {
                          sayHello(item.id);
                        }}
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
          {viewEdit && <Formcito saySome={saySome} task={task} />}
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
              onClick={() => removeTodo(idG)}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
