import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Navbar } from "../layout/Navbar";
import { Footer } from "../layout/Footer";
import { ArticlePage } from "../pages/ArticlePage";
import { Articles } from "../pages/Articles";
import { CreateArticle } from "../pages/CreateArticle";
import { EditArticle } from "../pages/EditArticle";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar> </Navbar>
        <section className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/new-article" element={<CreateArticle />}></Route>
            <Route path="/edit" element={<EditArticle />}></Route>
            <Route path="/article" element={<ArticlePage />}></Route>
            <Route path="/articles" element={<Articles />}></Route>
          </Routes>
        </section>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
};
