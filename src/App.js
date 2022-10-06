import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./componentes/LandingPage";
import Home from "./componentes/Home";
import Description from "./componentes/Description";
import CreateRecipes from "./componentes/CreateRecipes";
import Error from "./componentes/Error"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes/:id" element={<Description />} />
          <Route path="/createRecipe" element={<CreateRecipes />} />
          <Route path={"*" || "recipes"} element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
