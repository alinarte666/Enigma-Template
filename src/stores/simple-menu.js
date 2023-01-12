import { atom } from "recoil";

const simpleMenu = atom({
  key: "simpleMenu",
  default: {
    menu: [
      
      
      "devider",
      {
        icon: "Home",
        title: "Crud",
        subMenu: [
          {
            icon: "Edit",
            pathname: "/simple-menu/crud-data-list",
            title: "Data List",
          },
        ],
      },
      
    ],
  },
});

export { simpleMenu };
