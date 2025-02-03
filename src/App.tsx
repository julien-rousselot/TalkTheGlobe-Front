import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/NavigationBar/NavigationBar";
import AccueilPage from "./components/Pages/AccueilPage";
import CoursPage from "./components/Pages/CoursPage.";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Homepage />} />
        <Route path="/accueil" element={<AccueilPage />} />
        <Route path="/cours" element={<CoursPage />} />
      </Routes>
    </Router>
  );
};

export default App;
