import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
};

export default App;
