/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VideoPageProvider } from "./store/VideoPage/VideoPageProvider.jsx";
import { SearchQueryProvider } from "./store/SearchQuery/SearchQueryProvider.jsx";
import { UserContextProvider } from "./store/Auth/UserContextProvider.jsx";
import HomePage from "./pages/Home.jsx";
import VideoPage from "./pages/Video.jsx";
import ErrorPage from "./pages/Error.jsx";
import SearchPage from "./pages/Search.jsx";


export default function App() {
  const router = createBrowserRouter([
    {
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/video/:id", element: <VideoPage /> },
        { path: "/search", element: <SearchPage /> },
      ],
    },
  ]);

  return (
    <SearchQueryProvider>
      <VideoPageProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </VideoPageProvider>
    </SearchQueryProvider>
  );
}
