import { useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/atom/userAtom";
import { Link, useNavigate } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import me from "../../assets/images/me.jpg";
import logoUrl from "@/assets/images/logo.svg";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import PropTypes from "prop-types";

function Main(props) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };
  const [user, setCurrentUser] = useRecoilState(currentUserAtom);

  const logOut = () => setCurrentUser("");
  

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div
        className={`${props.className} z-[51] top-bar-boxed h-[70px] md:h-[65px]  border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700`}
      >
        <div className="h-full flex items-center">
          {/* BEGIN: Logo */}
          <Link
            to="/"
            className="logo -intro-x hidden md:flex xl:w-[180px] block"
          >
            <img
              alt="Enigma Tailwind HTML Admin Template"
              className="logo__image w-6"
              src={logoUrl}
            />
            <span className="logo__text text-white text-lg ml-3">
              {" "}
              Enigma{" "}
            </span>
          </Link>
          {/* END: Logo */}
          {/* BEGIN: Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="-intro-x h-[45px] mr-auto"
          >
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <a href="#">Application</a>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}
         
          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
            >
              <img
                alt="Midone Tailwind HTML Admin Template"
                src={me}
              />
            </DropdownToggle>
            <DropdownMenu className="w-56">
              <DropdownContent
                className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
              >
                <DropdownHeader tag="div" className="!font-normal">
                  <div className="font-medium">{user.user.firstName}</div>
                  <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                    Tu posicion n.n
                  </div>
                </DropdownHeader>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="User" className="w-4 h-4 mr-2" />{" "}
                  Profile
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Edit" className="w-4 h-4 mr-2" /> Add
                  Account
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide icon="Lock" className="w-4 h-4 mr-2" />{" "}
                  Reset Password
                </DropdownItem>
                <DropdownItem className="hover:bg-white/5">
                  <Lucide
                    icon="HelpCircle"
                    className="w-4 h-4 mr-2"
                  />{" "}
                  Help
                </DropdownItem>
                <DropdownDivider className="border-white/[0.08]" />
                <DropdownItem
                  className="hover:bg-white/5"
                  onClick={logOut}
                >
                  <Lucide
                    icon="ToggleRight"
                    className="w-4 h-4 mr-2"
                  />{" "}
                  Logout
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}
        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

Main.propTypes = {
  className: PropTypes.string,
};

Main.defaultProps = {
  className: "",
};

export default Main;
