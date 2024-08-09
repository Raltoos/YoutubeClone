import { useState } from "react";
import AppContent from "../components/AppContent";

const HomePage = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  function handleToggleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }
  return (
    <div>
      <AppContent
        handleToggleSideBar={handleToggleSideBar}
        isSideBarOpen={isSideBarOpen}
      />
    </div>
  );
};

export default HomePage;
