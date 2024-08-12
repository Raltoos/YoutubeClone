import { useContext, useState } from "react";
import axios from "axios";
import { UserAuthContext } from "../store/Auth/user-auth-context";

const UploadVideo = () => {
  const { user } = useContext(UserAuthContext);
  const [uploaded, setUploaded] = useState("Please enter the details to upload the video");

  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    setUploaded("Uploading.....");

    if (!videoFile || !user) return;

    try {
      setUploaded(false);
      const metadata = {
        snippet: {
          title: title,
          description: description,
        },
        status: {
          privacyStatus: "public",
        },
      };

      const uploadUrl =
        "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";
      const response = await axios.post(uploadUrl, metadata, {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      const uploadUrlResumable = response.headers["location"];

      const videoUploadResponse = await axios.put(
        uploadUrlResumable,
        videoFile,
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": videoFile.type,
            "Content-Length": videoFile.size,
          },
        }
      );

      setUploaded("Video Uploaded Successfully!... it may take some time to reflect on the channel");
      console.log("Upload complete:", videoUploadResponse.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="ml-72 mt-32 w-[500px] py-5 flex flex-col text-white gap-5 items-center border border-white">
      <h1 className="text-3xl mb-5">Upload Video</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Video Title"
        className="bg-inherit p-2 focus:outline-none border-b border-b-white"
      />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Video Description"
        className="bg-inherit p-2 focus:outline-none border-b border-b-white"
      />
      <div className="mr-5 bg-[#3EA6FF] p-2 rounded-3xl">
        <button onClick={handleUpload}>Post Video</button>
      </div>

      <p>{uploaded}</p>
    </div>
  );
};

export default UploadVideo;
