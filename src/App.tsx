import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Layout from "./layouts/layout";
import './icons';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
