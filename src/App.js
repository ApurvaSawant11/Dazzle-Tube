import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header, RequiresAuth, Sidebar } from "./components";
import {
  ForgotPassword,
  History,
  Home,
  LikedVideos,
  Login,
  Playlist,
  Signup,
  SinglePlaylist,
  SingleVideo,
  WatchLater,
} from "./pages";
import { useTheme } from "./context";
// mockman-js
import Mockman from "mockman-js";

function App() {
  const [showSidebar, setShowSidebar] = useState("");
  const { theme } = useTheme();

  return (
    <div className="App" data-theme={theme}>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-row">
        <Sidebar showSidebar={showSidebar} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/watch/:watchId" element={<SingleVideo />} />
          <Route element={<RequiresAuth />}>
            <Route path="/likedVideos" element={<LikedVideos />} />
            <Route path="/watchLater" element={<WatchLater />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
            <Route path="/history" element={<History />} />
          </Route>
          <Route path="/mockman" element={<Mockman />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
