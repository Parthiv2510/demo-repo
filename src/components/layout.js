// Layout.js
import React from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
