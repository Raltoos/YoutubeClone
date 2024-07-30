import YoutubeEmbed from "./YoutubeEmbed"

const VideoPlayerPage = (videoId) => {
  return (
    <div className="w-auto h-screen overflow-y-auto overflow-x-hidden pl-20 mt-5    ">
      <YoutubeEmbed videoId={videoId}/>
    </div>
  )
}

export default VideoPlayerPage
