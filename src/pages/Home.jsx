import { useState } from "react";
import AppContent from "../components/AppContent";
import Header from "../components/Header/Header";

const HomePage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  function handleToggleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Header handleToggle={handleToggleSideBar} />
      <AppContent
        handleToggleSideBar={handleToggleSideBar}
        isSideBarOpen={isSideBarOpen}
      />
    </div>
  );
};

export default HomePage;
