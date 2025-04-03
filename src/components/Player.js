import React, { useEffect, useRef, useState } from "react";
import "../styles/Player.scss";
import { FaPlay, FaPause, FaVolumeUp, FaEllipsisH } from "react-icons/fa";

const MusicPlayer = ({ song }) => {
  const audioRef = useRef(new Audio(song.musicUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play/Pause functionality
  useEffect(() => {
    audioRef.current.src = song.musicUrl;

    // Set duration once metadata is loaded
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current.duration);
    });

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", () => {});
    };
  }, [song, isPlaying]);

  // Update current time as song plays
  useEffect(() => {
    const updateTime = () => setCurrentTime(audioRef.current.currentTime);
    audioRef.current.addEventListener("timeupdate", updateTime);
    
    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Seek to a new time when slider is moved
  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,1)), url(${song.thumbnail})` }}>
      <h2>{song.title}</h2>
      <p>{song.artistName}</p>
      <img src={song.thumbnail} alt={song.title} className="song-art" />

      <div className="controls">
        {/* Three-dot menu */}
        <div className="menu-container">
          <FaEllipsisH className="icon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={() => setIsFavorite(!isFavorite)}>
                {isFavorite ? "Unlike" : "Like"}
              </button>
            </div>
          )}
        </div>

        {/* Play/Pause button */}
        <button onClick={togglePlayPause} className="play-pause">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Sound icon */}
        <FaVolumeUp className="icon" />
      </div>

      {/* Music Progress Bar */}
      <div className="progress-bar">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="seek-bar"
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Function to format time (mm:ss)
const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default MusicPlayer;
