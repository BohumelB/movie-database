import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Favorite from "./pages/Favorite";

const Main = () => {
  return (
    <div
      style={{
        padding: "6px",
        margin: "auto",
        maxWidth: "50%",
        backgroundColor: "white",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="detail" element={<Detail />} />
          <Route path="favorite" element={<Favorite />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Main;
