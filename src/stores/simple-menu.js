import { atom } from "recoil";

const simpleMenu = atom({
  key: "simpleMenu",
  default: {
    menu: [
      
      
      "devider",
      {
        icon: "Edit",
        title: "Crud",
        subMenu: [
          {
            icon: "",
            pathname: "/simple-menu/crud-data-list",
            title: "Data List",
          },
          {
            icon: "",
            pathname: "/simple-menu/crud-form",
            title: "Form",
          },
        ],
      },
      
    ],
  },
});

export { simpleMenu };
