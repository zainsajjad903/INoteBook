import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home ";
import About from "./components/About";
import NoteState from "./Context/Notes/NoteState";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route eaaxt path="/About" element={<About />} />
              <Route eaaxt path="/Login" element={<Login />} />
              <Route eaaxt path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </NoteState>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
