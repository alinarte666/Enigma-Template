import React from "react";
import { TomSelect } from "@/base-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { todoListAtom } from "./atom/todoAtom";

export const Formcito = ({ task, saySome }) => {
  const todoListita = useRecoilValue(todoListAtom);
  const [_, setTodoList] = useRecoilState(todoListAtom);
  const [newData, setNewData] = React.useState(task[0]);

  const handleChange = ({ target: { name, value } }) =>
    setNewData({ ...newData, [name]: value, id: task[0].id });

  const handleSubmit = () => {
    const todoListFilters = todoListita.filter(
      (item) => item.id !== newData.id
    );

    setTodoList([...todoListFilters, newData]);
    console.log(newData);
    saySome();
  };

  const handleCategorie = (e) => {
    return e == "1"
      ? "Sport & Outdoor"
      : e == "2"
      ? "Pc & laptop"
      : e == "3"
      ? "Smartphone & tablets"
      : e == "4"
      ? "Photography"
      : "";
  };

  return (
    <div className="w-[500px]  h-[600px] absolut z-50 left-[25%] -top-[20] flex flex-col  justify-around items-center">
      <form className="intro-y  box p-5">
        <div>
          <label htmlFor="crud-form-1" className="form-label">
            Product Name
          </label>
          <input
            id="crud-form-1"
            name="productName"
            value={newData.productName}
            onChange={handleChange}
            type="text"
            className="form-control w-full"
            //placeholder={task[0].productName}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="crud-form-2" className="form-label">
            Category
          </label>
          <TomSelect
            id="crud-form-2"
            name="selects"
            value={newData.cate}
            onChange={(w) =>
              setNewData({ ...newData, cate: handleCategorie(w) })
            }
            className="w-full"
          >
            <option value="1">Sport & Outdoor</option>
            <option value="2">PC & Laptop</option>
            <option value="3">Smartphone & Tablet</option>
            <option value="4">Photography</option>
          </TomSelect>
        </div>
        <div className="mt-3">
          <label htmlFor="crud-form-3" className="form-label">
            Quantity
          </label>
          <div className="input-group">
            <input
              id="crud-form-3"
              name="quantity"
              value={newData.quantity}
              onChange={handleChange}
              type="text"
              className="form-control"
              //placeholder={task[0].quantity}
              aria-describedby="input-group-1"
            />
            <div id="input-group-1" className="input-group-text">
              pcs
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="crud-form-4" className="form-label">
            Weight
          </label>
          <div className="input-group">
            <input
              id="crud-form-4"
              name="wight"
              value={newData.wight}
              onChange={handleChange}
              type="text"
              className="form-control"
              //placeholder={task[0].wight}
              aria-describedby="input-group-2"
            />
            <div id="input-group-2" className="input-group-text">
              grams
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label className="form-label">Price</label>
          <div className="sm:grid grid-cols-3 gap-2">
            <div className="input-group">
              <div id="input-group-3" className="input-group-text">
                Unit
              </div>
              <input
                type="text"
                name="unit"
                value={newData.unit}
                onChange={handleChange}
                className="form-control"
                //placeholder={task[0].unit}
                aria-describedby="input-group-3"
              />
            </div>
            <div className="input-group mt-2 sm:mt-0">
              <div id="input-group-4" className="input-group-text">
                Wholesale
              </div>
              <input
                type="text"
                name="wholesale"
                value={newData.wholesale}
                onChange={handleChange}
                className="form-control"
                //placeholder={task[0].wholesale}
                aria-describedby="input-group-4"
              />
            </div>
            <div className="input-group mt-2 sm:mt-0">
              <div id="input-group-5" className="input-group-text">
                Bulk
              </div>
              <input
                type="text"
                name="bulk"
                value={newData.bulk}
                onChange={handleChange}
                className="form-control"
                //placeholder={task[0].bulk}
                aria-describedby="input-group-5"
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label>Active Status</label>
          <div className="form-switch mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              name="status"
              value={newData.status}
              onChange={(e) =>
                setNewData({
                  ...newData,
                  status: e.target.checked ? true : false,
                })
              }
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
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
