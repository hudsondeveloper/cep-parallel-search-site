import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cep-parallel-search-site" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
