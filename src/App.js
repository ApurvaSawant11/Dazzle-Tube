import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header, Sidebar } from "./components";
import { ForgotPassword, Home, Login, Signup } from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/forgot_password" element={ <ForgotPassword /> } />
        <Route path="/" element={ <Home /> } />
      </Routes>
    </div>
  );
}

export default App;
