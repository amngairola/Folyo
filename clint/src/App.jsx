import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import NotFoundPage from "./Pages/NotFoundPage";
import Login from "./components/admin/Login";
import Layout from "./Pages/admin/Layout";
import DashBoard from "./Pages/admin/DashBoard";
import Addblog from "./Pages/admin/Addblog";
import Comments from "./Pages/admin/Comments";
import ListBlog from "./Pages/admin/ListBlog";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { token } = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<DashBoard />} />
          <Route path="addblog" element={<Addblog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
