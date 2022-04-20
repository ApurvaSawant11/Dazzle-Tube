import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header, RequiresAuth, Sidebar } from "./components";
import {
  ForgotPassword,
  Home,
  LikedVideos,
  Login,
  Signup,
  SingleVideo,
  WatchLater,
} from "./pages";
// mockman-js
import Mockman from "mockman-js";

function App() {
  const [showSidebar, setShowSidebar] = useState("");
  return (
    <div className="App">
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
          </Route>
          <Route path="/mockman" element={<Mockman />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
