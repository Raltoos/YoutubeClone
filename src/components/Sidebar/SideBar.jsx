import {
  MdHomeFilled,
  MdSubscriptions,
  MdOutlineKeyboardArrowRight,
  MdOutlineSwitchAccount,
  MdOutlineHistory,
  MdPlaylistPlay,
  MdLightbulbOutline,
} from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import { RiScissorsFill } from "react-icons/ri";
import { FiThumbsUp } from "react-icons/fi";
import { SiYoutubeshorts } from "react-icons/si";
import { GrChannel } from "react-icons/gr";

import SideBarTab from "./SideBarTab";

export default function SideBar() {
  return (
    <div className="md:w-4/12 h-[calc(100vh-64px)] sticky overflow-hidden hover:overflow-y-scroll hover:overflow-x-hidden hover:scrollbar-thin hover:scrollbar-webkit hover:outline-none flex flex-col items-start gap-3">
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

      <div className="w-11/12 border-t-[2px] border-[#2c2c2c] ml-3 mb-0"></div>

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
    </div>
  );
}
