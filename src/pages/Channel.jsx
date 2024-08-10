/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import ChannelResultPage from "../components/ChannelResult";
import Header from "../components/Header/Header";
import SideBarClosed from "../components/Sidebar/SideBarClosed";

const ChannelPage = () => {
  const params = useParams();

  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col items-center overflow-hidden">
      <Header className="fixed top-0" />
      <div className="flex w-full justify-between overflow-y-scroll">
        <div className="w-[100px]">
          <SideBarClosed />
        </div>
        <div className="w-full">
          <ChannelResultPage channelId={params.id}/>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
