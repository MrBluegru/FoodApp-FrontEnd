import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, clearDetails } from "../redux/action";
import { Link } from "react-router-dom";
import Card from "./Card";
import NavBar from "./NavBar";
import Paginado from "./Paginado";
import Reloading from "./Reloading";
import "../styles/home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(getRecipes());
    }
    setCurrentPage(1);
    dispatch(clearDetails());
  }, [dispatch, allRecipes]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  const currentRecipes = allRecipes.length
    ? allRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes)
    : [];

  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="home">
      <div className="titulo">
        <Link className="linkS" to={"/"}>
          <h1>FOOD APP</h1>
        </Link>
      </div>

      <div className="navbar">
        <NavBar />
      </div>

      <div className="paginado">
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>

      <div className="cards">
        {error.length ? (
          <button>{error}</button>
        ) : currentRecipes.length > 0 ? (
          currentRecipes.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                image={e.image}
                name={e.name}
                diets={e.diets}
                healthScore={e.healthScore}
              />
            );
          })
        ) : (
          <Reloading />
        )}
      </div>
    </div>
  );
}
