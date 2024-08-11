/* eslint-disable react/prop-types */
import {
  MdHomeFilled,
  MdSubscriptions,
  MdOutlineKeyboardArrowRight,
  MdOutlineSwitchAccount,
  MdOutlineHistory,
  MdPlaylistPlay,
  MdLightbulbOutline,
  MdOutlineShoppingBag,
  MdOutlinePodcasts,
} from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import { RiScissorsFill } from "react-icons/ri";
import { FiThumbsUp } from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import { GrChannel } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CiTrophy } from "react-icons/ci";
import { RiNewspaperLine } from "react-icons/ri";
import { GoLightBulb } from "react-icons/go";
import { SiYoutubegaming } from "react-icons/si";
import { IoMusicalNotesOutline } from "react-icons/io5";

import SideBarTab from "./SideBarTab";
import { auth, provider, signInWithPopup } from "../../firebase";
import { UserAuthContext } from "../../store/Auth/user-auth-context";
import { useContext } from "react";

export default function SideBar({ handleExploreClick, handleLoadingBar }) {
  const { user, setUser } = useContext(UserAuthContext);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };
  return (
    <div className="md:w-3/12 h-[calc(100vh-64px)] sticky hover:overflow-y-scroll hover:overflow-x-hidden hover:scrollbar-thin scrollbar-webkit hover:outline-none flex flex-col items-start gap-3">
      <div className="flex flex-col mt-4">
        <SideBarTab>
          <MdHomeFilled color="white" size="1.4rem" /> Home
        </SideBarTab>
        <SideBarTab>
          <SiYoutubeshorts color="white" size="1.4rem" /> Shorts
        </SideBarTab>
        <SideBarTab>
          <MdSubscriptions color="white" size="1.4rem" /> Subscriptions
        </SideBarTab>
      </div>

      <div className="w-11/12 border-t-[2px] border-[#2c2c2c] ml-3 mb-0"></div>

      {user ? (
        <div className="flex flex-col">
          <div className="w-30 h-10 flex items-center text-white text-md font-innterTight ml-7 gap-2">
            You
            <MdOutlineKeyboardArrowRight
              color="white"
              size="1.5rem"
              className="relative top-[1.1px]"
            />
          </div>
          <SideBarTab>
            <MdOutlineSwitchAccount color="white" size="1.4rem" />
            <p className="w-fit">Your Channel</p>
          </SideBarTab>
          <SideBarTab>
            <MdOutlineHistory color="white" size="1.4rem" /> History
          </SideBarTab>
          <SideBarTab>
            <MdPlaylistPlay color="white" size="1.4rem" /> Playlists
          </SideBarTab>
          <SideBarTab>
            <GoVideo color="white" size="1.4rem" /> Your videos
          </SideBarTab>
          <SideBarTab>
            <MdLightbulbOutline color="white" size="1.4rem" /> Your Courses
          </SideBarTab>
          <SideBarTab>
            <FaRegClock color="white" size="1.4rem" /> Watch Later
          </SideBarTab>
          <SideBarTab>
            <FiThumbsUp color="white" size="1.4rem" /> Liked Videos
          </SideBarTab>
          <SideBarTab>
            <RiScissorsFill color="white" size="1.4rem" /> Your Clips
          </SideBarTab>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[250px]">
          <p className="text-white text-sm w-[20ch]">
            Sign in to like videos, comment and subscribe
          </p>
          <div
            className="flex justify-center items-center gap-1 mr-2 border border-highlight p-2 rounded-3xl hover:bg-[#3ca3f75a] cursor-pointer mt-2"
            onClick={handleSignIn}
          >
            <CgProfile color="#3CA3F7" size="1.7rem" />
            <p className="text-[#3CA3F7] w-[50px]">Sign In</p>
          </div>
        </div>
      )}

      <div className="w-11/12 border-t-[2px] border-[#2c2c2c] ml-3 mb-0"></div>

      {user ? (
        <div className="flex flex-col">
          <div className="w-30 h-10 flex items-center text-white text-md font-innterTight ml-7 gap-2">
            Subscriptions
          </div>
          <SideBarTab>
            <GrChannel color="white" size="1.4rem" /> Account
          </SideBarTab>
          <SideBarTab>
            <GrChannel color="white" size="1.4rem" /> Account
          </SideBarTab>
          <SideBarTab>
            <GrChannel color="white" size="1.4rem" /> Account
          </SideBarTab>
          <SideBarTab>
            <GrChannel color="white" size="1.4rem" /> Account
          </SideBarTab>
          <SideBarTab>
            <GrChannel color="white" size="1.4rem" /> Account
          </SideBarTab>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-30 h-10 flex items-center text-white text-md font-innterTight ml-7 gap-2 font-semibold">
            Explore
          </div>
          <SideBarTab
            onclick={() => {
              handleLoadingBar();
              handleExploreClick("sports");
            }}
          >
            <CiTrophy color="white" size="1.5rem" /> Sports
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("news");
            }}>
            <RiNewspaperLine color="white" size="1.4rem" /> News
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("courses");
            }}>
            <GoLightBulb color="white" size="1.4rem" /> Courses
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("gaming");
            }}>
            <SiYoutubegaming color="white" size="1.4rem" /> Gaming
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("shopping");
            }}>
            <MdOutlineShoppingBag color="white" size="1.4rem" /> Shopping
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("podcast");
            }}>
            <MdOutlinePodcasts color="white" size="1.4rem" /> Podcast
          </SideBarTab>
          <SideBarTab onclick={() => {
              handleLoadingBar();
              handleExploreClick("music");
            }}>
            <IoMusicalNotesOutline color="white" size="1.4rem" /> Music
          </SideBarTab>
        </div>
      )}
    </div>
  );
}
