/* eslint-disable react/prop-types */
import { FaBars, FaYoutube } from "react-icons/fa";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import SearchBar from "../SearchBar.jsx";
import { VideoPageContext } from "../../store/VideoPage/video-page-context.jsx";
import { useContext } from "react";
import { UserLoginContext } from "../../store/LoginCreds/userLoginContext.jsx";
import { NavLink } from "react-router-dom";

export default function Header({ handleToggle }) {
  const { setVideoPageOpen } = useContext(VideoPageContext);
  const { user } = useContext(UserLoginContext);

  function handleClick() {
    setVideoPageOpen([false, ""]);
  }

  return (
    <div className="bg-background h-16 p-2 w-screen flex items-center justify-between">
      <div className="flex items-center mr-2">
        <div className="p-3 mr-4 cursor-pointer" onClick={handleToggle}>
          <FaBars color="#616161" size="1.3rem" />
        </div>
        <div
          className="flex items-center h-full cursor-pointer"
          onClick={handleClick}
        >
          <FaYoutube color="red" size="2.3rem" />
          <p
            style={{ color: "white" }}
            className="p-1 text-lg font-innterTight"
          >
            AnujTube
          </p>
        </div>
      </div>
      <SearchBar />
      {user ? (
        <div className="flex gap-8 mr-2">
          <AiOutlineVideoCameraAdd color="white" size="2rem" />
          <IoMdNotificationsOutline color="white" size="2rem" />
          <CgProfile color="white" size="2rem" />
        </div>
      ) : (
        <NavLink to="login">
          <div className="flex items-center gap-2 border border-highlight p-2 rounded-3xl hover:bg-[#3ca3f75f] cursor-pointer">
            <CgProfile color="#3CA3F7" size="1.3rem" />
            <p className="text-[#3CA3F7] text-sm w-[49px] relative">Sign in</p>
          </div>
        </NavLink>
      )}
    </div>
  );
}
