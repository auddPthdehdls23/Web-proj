import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import GrandPage from './pages/GrandPage';
// 다른 페이지 import 예정

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grade/:year" element={<GrandPage />} />
      {/* 상세 페이지들 이후 추가 */}
    </Routes>
  );
}

export default App;
