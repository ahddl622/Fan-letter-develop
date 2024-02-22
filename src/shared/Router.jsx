import Layout from "components/layout/Layout";
import Detail from "pages/Detail";
import Home from "pages/Home";
import LoginForm from "pages/LoginForm";
import MyProfile from "pages/MyProfile";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function Router() {
  const isLogin = useSelector((state) => state.auth.isLogin)
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/*" element={<Navigate replace to="/loginform" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
