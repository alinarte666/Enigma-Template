import { ClassicEditor, TomSelect } from "@/base-components";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../../recoil/atom/todoAtom";
import { v4 } from "uuid";
import { method } from "lodash";

function Main() {
  const [_, setTodoList] = useRecoilState(todoListAtom);
  const [categories, setCategories] = useState([3]);
  const editorConfig = {
    toolbar: {
      items: ["bold", "italic", "link"],
    },
  };
  const [editorData, setEditorData] = useState(
    "<p>Content of the editor.</p>"
  );

  const [data, setData] = useState({
    productName: "",
    quantity: "",
    wight: "",
    unit: "",
    wholesale: "",
    bulk: "",
    cate: "",
    completed: "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });

  const addTodoItem = (e) => {
    e.preventDefault();
    if (data) {
      setTodoList((oldTodoList) => [...oldTodoList, data]);
    }
    setData({
      productName: "",
      quantity: "",
      wight: "",
      unit: "",
      wholesale: "",
      bulk: "",
      status: false,
    });
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

  const sendDb = () => {
    const param = `https://api-todos-prueba.onrender.com/api/v1/list/34/tasks`;
    fetch(param, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE2LCJpYXQiOjE2Njk4Mjk4MjcsImV4cCI6MTY3MjQyMTgyN30.MaMJO5KAo6I3fwtes_IV0mB9kxVBgC1aHbfWlZNVpk4",
      },
      body: JSON.stringify({ title: "test666", completed: true }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const sendTwo = () => {
    let config = {
      headers: {
        Accept: "application/json; charset=utf-8",
        "content-type": "application/json; charset=utf-8",
        Authorization:'',
      },
      
    };
    fetch(
      "https://api-todos-prueba.onrender.com/api/v1/list/34/tasks", config)
      .then((res) => {
        console.log(res.body);
        return res.json();
      })
      .then((req) => console.log(req))
      .catch((error) => console.log({ error }));
  };

  useEffect(() => {
    const tokencito = localStorage.getItem("token");
    console.log(tokencito)
  }, [])

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Form Layout</h2>
      </div>
      <form className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 lg:col-span-6 ">
          {/* BEGIN: Form Layout */}
          <div className="intro-y box p-5">
            <div>
              <label htmlFor="crud-form-1" className="form-label">
                Product Name
              </label>
              <input
                id="crud-form-1"
                name="productName"
                value={data.productName}
                onChange={handleChange}
                type="text"
                className="form-control w-full"
                placeholder="Input text"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="crud-form-2" className="form-label">
                Category
              </label>
              <TomSelect
                id="crud-form-2"
                name="selects"
                //value={data.cate}
                onChange={(w) =>
                  setData({
                    ...data,
                    cate: handleCategorie(w),
                    id: v4(),
                  })
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
                  value={data.quantity}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
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
                  value={data.wight}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Weight"
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
                  <div
                    id="input-group-3"
                    className="input-group-text"
                  >
                    Unit
                  </div>
                  <input
                    type="text"
                    name="unit"
                    value={data.unit}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Unit"
                    aria-describedby="input-group-3"
                  />
                </div>
                <div className="input-group mt-2 sm:mt-0">
                  <div
                    id="input-group-4"
                    className="input-group-text"
                  >
                    Wholesale
                  </div>
                  <input
                    type="text"
                    name="wholesale"
                    value={data.wholesale}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Wholesale"
                    aria-describedby="input-group-4"
                  />
                </div>
                <div className="input-group mt-2 sm:mt-0">
                  <div
                    id="input-group-5"
                    className="input-group-text"
                  >
                    Bulk
                  </div>
                  <input
                    type="text"
                    name="bulk"
                    value={data.bulk}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Bulk"
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
                  onChange={(e) =>
                    setData({
                      ...data,
                      status: e.target.checked ? true : false,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <label>Description</label>
              <div className="mt-2">
                <ClassicEditor
                  value={editorData}
                  onChange={setEditorData}
                  config={editorConfig}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                className="btn btn-outline-secondary w-24 mr-1"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary w-24"
                onClick={(e) => addTodoItem(e)}
              >
                Save
              </button>
            </div>
          </div>
          {/* END: Form Layout */}
        </div>
      </form>
    </>
  );
}

export default Main;
