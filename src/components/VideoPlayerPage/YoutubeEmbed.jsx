/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useCallback } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCompress, FaVolumeMute } from "react-icons/fa";

const YoutubePlayer = ({videoId}) => {
  const VID = videoId.videoId;

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [apiReady, setApiReady] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const loadYouTubeAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }

      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onload = () => resolve();
      tag.onerror = () => reject(new Error("Failed to load YouTube API"));
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
        resolve();
      };
    });
  }, []);

  const initializePlayer = useCallback(() => {
    if (window.YT && window.YT.Player && playerRef.current) {
      try {
        const newPlayer = new window.YT.Player(playerRef.current, {
          height: "100%",
          width: "100%",
          videoId: VID,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            vq: "hd1080",
            playsinline: 1,
            origin: window.location.origin,
            enablejsapi: 1,
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: (e) => setError(`Player Error: ${e.data}`),
          },
        });
        setPlayer(newPlayer);
      } catch (err) {
        setError(`Failed to initialize player: ${err.message}`);
      }
    } else {
      setError("YouTube API or player element not available");
    }
  }, [VID]);

  const onPlayerReady = (event) => {
    const player = event.target;
    setIsMuted(player.isMuted());
    setVolume(0);
    setDuration(player.getDuration());
  };

  const onPlayerStateChange = (event) => {
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initYouTubePlayer = async () => {
      try {
        await loadYouTubeAPI();
        if (isMounted) {
          setApiReady(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(`API Load Error: ${err.message}`);
        }
      }
    };

    initYouTubePlayer();

    return () => {
      isMounted = false;
      if (player && player.destroy) {
        player.destroy();
      }
    };
  }, [loadYouTubeAPI, player]);

  useEffect(() => {
    if (apiReady) {
      initializePlayer();
    }
  }, [apiReady, initializePlayer]);

  useEffect(() => {
    const updateTime = () => {
      if (player && player.getCurrentTime) {
        setCurrentTime(player.getCurrentTime());
      }
    };

    const timeUpdateInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeUpdateInterval);
  }, [player]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div ref={containerRef} className="w-full h-4/6 overflow-hidden aspect-video relative group">
      <div
        ref={playerRef}
        className="absolute w-[300%] h-full left-[-100%] top-0"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full px-4 py-2 flex flex-col gap-2">
          <input
            ref={progressBarRef}
            type="range"
            id="videoPlayer"
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
    </div>
  );
};

export default YoutubePlayer;