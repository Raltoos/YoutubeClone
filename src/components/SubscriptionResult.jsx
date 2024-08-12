import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserAuthContext } from "../store/Auth/user-auth-context";
import { NavLink } from "react-router-dom";

const SubscriptionsResults = () => {
  const { user } = useContext(UserAuthContext);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYouTubeSubscriptions = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/subscriptions",
          {
            params: {
              part: "snippet",
              mine: true,
              maxResults: 50,
            },
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );

        console.log(response.data);
        setSubs(response.data.items);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeSubscriptions();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleDescription(desc) {
    if (desc.length > 50) {
      desc = desc.substring(0, 50);
      desc += "...";
    }

    return desc;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
      {subs &&
        subs.map((sub, index) => (
          <NavLink key={index} to={`/channel/${sub.snippet.resourceId.channelId}`}>
            <div className="flex gap-5">
              <div className="w-[100px]">
                <img
                  src={sub.snippet.thumbnails.medium.url}
                  alt=""
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <p>{sub.snippet.title}</p>
                <p>{handleDescription(sub.snippet.description)}</p>
              </div>
            </div>
          </NavLink>
        ))}
    </div>
  );
};

export default SubscriptionsResults;
