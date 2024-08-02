/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaVolumeMute,
} from "react-icons/fa";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlayerControl = forwardRef(function PlayerControl(
  {
    toggleFullscreen,
    isFullscreen,
    player,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    duration,
    currentTime,
    setCurrentTime,
  },
  ref
) {
  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        setVolume(player.getVolume());
      } else {
        player.mute();
        setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    if (player) {
      const newVolume = parseInt(e.target.value, 10);
      player.setVolume(newVolume);
      player.unMute();
      setVolume(newVolume);
      setIsMuted(false);
    }
  };

  const handleProgressChange = (e) => {
    if (player && duration) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      player.seekTo(newTime, true);
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-full px-4 py-2 flex flex-col gap-2">
        <input
          ref={ref}
          type="range"
          className="w-full"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
        />
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlayPause} className="focus:outline-none">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="focus:outline-none">
                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                className="w-20"
                id=""
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <button onClick={toggleFullscreen} className="focus:outline-none">
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
    </div>
  );
});

export default PlayerControl;
