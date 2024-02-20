import Detail from "pages/Detail";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/detail/:id"
          element={<Detail />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;