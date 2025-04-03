import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import "../styles/Sidebar.scss";

const Sidebar = ({ setCurrentSong }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    setRecentlyPlayed(JSON.parse(sessionStorage.getItem("recentlyPlayed")) || []);
  }, []);

  return (
    <div className="sidebar">
      <FaSpotify className="logo" />
      <ul>
        <li>For You</li>
        <li>Top Tracks</li>
        <li onClick={() => setFavorites(JSON.parse(localStorage.getItem("favorites")) || [])}>
          Favorites ({favorites.length})
        </li>
        <li onClick={() => setRecentlyPlayed(JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [])}>
          Recently Played ({recentlyPlayed.length})
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
