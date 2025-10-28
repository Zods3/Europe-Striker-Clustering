import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PlayerSearch from "./Pages/PlayerSearch";
import Visualization from "./Pages/Visualization";
import About from "./Pages/About";
import PlayerDetail from "./Pages/PlayerDetail";
import Help from "./Pages/Help";
import Navbar from "./Components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<PlayerSearch />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/about" element={<About />} />
        <Route path="/player/:name" element={<PlayerDetail />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
