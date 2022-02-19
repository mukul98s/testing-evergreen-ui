import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import Schedule from "./page/Schedule";
import Container from "./components/Container";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<Schedule />} />
      </Routes>
    </Container>
  );
}

export default App;
