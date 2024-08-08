/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VideoPageProvider } from "./store/VideoPage/VideoPageProvider.jsx";
import { SearchQueryProvider } from "./store/SearchQuery/SearchQueryProvider.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {UserLoginProvider} from "./store/LoginCreds/userLoginContext.jsx"

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
  ]);

  return (
    <SearchQueryProvider>
      <VideoPageProvider>
        <UserLoginProvider>
          <RouterProvider router={router} />
        </UserLoginProvider>
      </VideoPageProvider>
    </SearchQueryProvider>
  );
}
