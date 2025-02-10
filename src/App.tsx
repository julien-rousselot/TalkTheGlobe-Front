import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Homepage from "./components/NavigationBar/NavigationBar";
import HomePage from "./components/Pages/HomePage";
import CoursPage from "./components/Pages/CoursPage.";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cours" element={<CoursPage />} />
      </Routes>
    </Router>
  );
};

export default App;
