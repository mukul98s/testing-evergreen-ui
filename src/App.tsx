import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import Schedule from "./page/Schedule";
import Container from "./components/Container";
import { SharedCalender } from "./page/SharedCalender";
import { CrudCalender } from "./page/CrudCalender";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<Schedule />} />
        <Route path="/network" element={<SharedCalender />} />
        <Route path="/work" element={<CrudCalender />} />
      </Routes>
    </Container>
  );
}

export default App;
