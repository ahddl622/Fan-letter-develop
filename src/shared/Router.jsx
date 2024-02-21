import Layout from "components/layout/Layout";
import CreateAccountForm from "pages/CreateAccountForm";
import Detail from "pages/Detail";
import Home from "pages/Home";
import LoginForm from "pages/LoginForm";
import MyProfile from "pages/MyProfile";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function Router() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/loginform" element={<LoginForm />} />
            <Route path="/createaccountform" element={<CreateAccountForm />} />
            <Route path="/*" element={<Navigate replace to="/loginform" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
