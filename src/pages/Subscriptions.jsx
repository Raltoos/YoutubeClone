import SubscriptionsResults from "../components/SubscriptionResult";
import Header from "../components/Header/Header";
import SideBar from "../components/Sidebar/SideBar";

const SubscriptionsPage = () => {
  return (
    <div className="w-screen h-screen bg-[#0f0f0f] font-sans flex flex-col overflow-hidden">
      <Header className="sticky top-0 z-10" />
      <div className="flex-1 flex overflow-hidden">
        <SideBar className="flex-shrink-0" />
        <div className="flex-1 overflow-y-auto p-5">
          <SubscriptionsResults />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;