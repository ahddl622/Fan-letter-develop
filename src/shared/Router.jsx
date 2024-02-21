import Layout from "components/layout/Layout";
import CreateAccountForm from "pages/CreateAccountForm";
import Detail from "pages/Detail";
import Home from "pages/Home";
import LoginForm from "pages/LoginForm";
import MyProfile from "pages/MyProfile";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout/>}> */}
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/createaccountform" element={<CreateAccountForm />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
