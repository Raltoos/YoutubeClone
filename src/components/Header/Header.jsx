/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaBars, FaYoutube } from "react-icons/fa";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import SearchBar from "../SearchBar.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import { UserAuthContext } from "../../store/Auth/user-auth-context.jsx";

export default function Header({ handleToggle }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (response) => {
      setUser(response.access_token);
      console.log("Login successful:", response);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
    scope:
      "profile email openid https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner",
  });

  const fetchProfileInfo = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const profileData = response.data;
      setProfile(profileData);

      // Store profile picture in local storage
      localStorage.setItem("profilePicture", profileData.picture);
    } catch (error) {
      console.error("Error fetching profile info:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfileInfo(user).catch((error) => {
        console.error("Failed to fetch profile info:", error);
      });
    } else {
      // Check local storage for profile picture
      const storedPicture = localStorage.getItem("profilePicture");
      if (storedPicture) {
        setProfile((prevProfile) => ({ ...prevProfile, picture: storedPicture }));
      }
    }
  }, [user]);

  function handleSignOut() {
    setUser(null);
    localStorage.removeItem("profilePicture"); // Remove profile picture from local storage on sign out
  }

  function handleClick() {
    navigate("../");
  }

  return (
    <div className="bg-background h-16 p-2 w-screen flex items-center justify-between">
      <div className="flex items-center mr-2">
        <div className="p-3 mr-4 cursor-pointer" onClick={handleToggle}>
          <FaBars color="#616161" size="1.3rem" />
        </div>
        <div
          className="flex items-center h-full cursor-pointer"
          onClick={handleClick}
        >
          <FaYoutube color="red" size="2.3rem" />
          <p
            style={{ color: "white" }}
            className="p-1 text-lg font-innterTight"
          >
            AnujTube
          </p>
        </div>
      </div>
      <SearchBar />
      {user && profile ? (
        <div className="flex gap-8 mr-2">
          <NavLink to="/upload">
            <div className="cursor-pointer">
              <AiOutlineVideoCameraAdd color="white" size="2rem" />
            </div>
          </NavLink>
          <IoMdNotificationsOutline color="white" size="2rem" />
          <div
            className="w-8 rounded h-full cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img src={profile.picture} className="object-cover rounded-full" alt="Profile" />
            {open && (
              <div className="absolute top-0 right-[60px] mt-2 w-52 bg-[#282828] border border-gray-300 rounded shadow-lg z-10 text-white">
                <p className="p-2 hover:bg-[#45454568] cursor-pointer">
                  {profile.name}
                </p>
                <p className="p-2 hover:bg-[#45454568] cursor-pointer">
                  {profile.email}
                </p>
                <p
                  className="p-2 hover:bg-[#45454568] cursor-pointer"
                  onClick={handleSignOut}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center gap-1 mr-2 border border-highlight p-2 rounded-3xl hover:bg-[#3ca3f75a] cursor-pointer"
          onClick={login}
        >
          <CgProfile color="#3CA3F7" size="1.7rem" />
          <p className="text-[#3CA3F7] w-[50px]">Sign In</p>
        </div>
      )}
    </div>
  );
}
