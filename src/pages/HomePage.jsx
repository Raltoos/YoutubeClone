import { useContext, useState } from "react";
import AppContent from "../components/AppContent.jsx";
import { UserLoginContext } from "../store/LoginCreds/userLoginContext.jsx";

const HomePage = () => {
  const { user } = useContext(UserLoginContext);
  console.log(user);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  function handleToggleSideBar() {
    setIsSideBarOpen((prev) => !prev);
  }
  return (
    <AppContent
      handleToggleSideBar={handleToggleSideBar}
      isSideBarOpen={isSideBarOpen}
    />
  );
};

export default HomePage;
