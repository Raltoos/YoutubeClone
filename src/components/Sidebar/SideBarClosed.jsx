import {
  MdHomeFilled,
  MdSubscriptions,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

import SideBarClosedTab from "./SideBarClosedTab";

export default function SideBarClosed() {
  return (
    <div className="w-[175px] h-[calc(100vh-64px)] sticky overflow-hidden  hover:overflow-x-hidden hover:outline-none flex flex-col items-start gap-3 mt-4">
      <div className="flex flex-col">
        <SideBarClosedTab>
          <MdHomeFilled color="white" size="1.25rem" /> Home
        </SideBarClosedTab>
        <SideBarClosedTab>
          <SiYoutubeshorts color="white" size="1.25rem" /> Shorts
        </SideBarClosedTab>
        <SideBarClosedTab>
          <MdSubscriptions color="white" size="1.25rem" /> Subscriptions
        </SideBarClosedTab>
        <SideBarClosedTab>
        <MdOutlineSwitchAccount color="white" size="1.25rem" /> You
        </SideBarClosedTab>
      </div>
    </div>
  );
}
