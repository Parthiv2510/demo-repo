import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Homepage from "./components/homepage/homepage";
import FullBlogPost from "./components/FullBlogPost";
import SubscribeForm from "./components/subscribeform";
import Footer from "./components/footer/footer";
import MakeExtraMoney from "./components/makeExtraMoney";
import WorkFromHome from "./components/WorkFromHome";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Adminpanel from "./components/Admin/Adminpanel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/homepage" element={<><Header /><Homepage /><SubscribeForm /><Footer /></>} />
        <Route path="/makeExtraMoney" element={<><Header /><MakeExtraMoney /><SubscribeForm /><Footer /></>} />
        <Route path="/WorkFromHome" element={<><Header /><WorkFromHome /><SubscribeForm /><Footer /></>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Adminpanel />} />
        <Route path="/post/:postId" element={<><Header /><FullBlogPost /><SubscribeForm /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
