import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Layout from "./layouts/layout";
import './icons';
import AboutMe from "./pages/AboutMe";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
