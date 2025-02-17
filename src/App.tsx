import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/Pages/HomePage";
import CoursPage from "./components/Pages/CoursPage.";
import ServicesPage from "./components/Pages/ServicesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cours" element={<CoursPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
