import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Layout from "./layouts/layout";
import './icons';
import AboutMe from "./pages/AboutMe";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="*" element={<Navigate to="/home" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
