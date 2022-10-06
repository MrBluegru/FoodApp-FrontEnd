import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDiets, createRecipes } from "../redux/action";
import "../styles/createRecipes.css";

export default function CreateAct() {
  const dispatch = useDispatch();
  const alldiets = useSelector((state) => state.diets);
  const allDishType = [
    {
      id: "1",
      name: "side dish",
    },
    {
      id: "2",
      name: "lunch",
    },
    {
      id: "3",
      name: "main course",
    },
    {
      id: "4",
      name: "main dish",
    },
    {
      id: "5",
      name: "dinner",
    },
    {
      id: "6",
      name: "morning meal",
    },
    {
      id: "7",
      name: "brunch",
    },
    {
      id: "8",
      name: "breakfast",
    },
    {
      id: "9",
      name: "soup",
    },
    {
      id: "10",
      name: "salad",
    },
    {
      id: "11",
      name: "condiment",
    },
    {
      id: "12",
      name: "dip",
    },
    {
      id: "13",
      name: "sauce",
    },
    {
      id: "14",
      name: "spread",
    },
  ];
  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 1,
    dishTypes: [],
    StepByStep: [],
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    if (!input.diets.includes(e.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
    if (input.diets.includes(e.target.value)) {
      alert`No puedes añadir una diet ya agregada`;
    }
  }

  function handleSelectDT(e) {
    if (!input.dishTypes.includes(e.target.value)) {
      setInput({
        ...input,
        dishTypes: [...input.dishTypes, e.target.value],
      });
    }
    if (input.dishTypes.includes(e.target.value)) {
      alert`No puedes añadir un dish type ya agregado`;
    }
  }

  function handleDeleteDT(dishTypeS) {
    setInput({
      ...input,
      dishTypes: input.dishTypes.filter((e) => e !== dishTypeS),
    });
  }

  function handleDelete(dietS) {
    setInput({
      ...input,
      diets: input.diets.filter((e) => e !== dietS),
    });
  }

  function enviarRecipe(e) {
    e.preventDefault();
    if (DesactivateDisable !== undefined) {
      return alert(`Completa con los datos solicitados para crear la receta`);
    } else {
      dispatch(createRecipes(input));
      setInput({
        name: "",
        image: "",
        summary: "",
        healthScore: 1,
        dishTypes: [],
        StepByStep: [],
        diets: [],
      });
      alert(`Receta creada`);
    }
  }

  //Validacion////////////////////////////////////////////////////////

  const regex = {
    espacios: /^\s/, // eslint-disable-line
    numeros: /[^a-z ]\ *([.0-9])*\d/g, // eslint-disable-line
    caracteresEs: /[\[\\\^\$\|\?\*\+\(\)\{\}]/g, // eslint-disable-line
    caracteresName: /[\[\\\,\.\^\$\|\?\*\+\(\)\{\}]/g, // eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, // eslint-disable-line
  };

  const validacionName = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.numeros.test(entrada)) {
      return `No puede usar numeros`;
    }
    if (regex.caracteresName.test(entrada)) {
      return `No puede usar caracteres extraños`;
    }
    if (entrada.length <= 3) {
      return `Nombre muy corto`;
    }
    if (entrada.length > 70) {
      return `Nombre muy largo`;
    }
  };

  const validacionImg = (entrada) => {
    if (regex.url.test(entrada) === false) {
      return `Url de la imagen no valida`;
    }
  };

  const validacionSumm = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.caracteresEs.test(entrada)) {
      return `No puedes usar caracteres extraños`;
    }
  };

  const validacionSbS = (entrada) => {
    if (regex.espacios.test(entrada)) {
      return `No puede empezar con espacios en blanco`;
    }
    if (regex.caracteresEs.test(entrada)) {
      return `No puedes usar caracteres extraños`;
    }
  };

  const validacionDishT = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que minimo tenga un tipo de plato`;
    }
  };

  const validacionDiets = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que minimo tenga un tipo de Dieta`;
    }
  };

  const validacionHealth = (entrada) => {
    if (entrada === null) {
      return `Se requiere que minimo tenga una calificacion`;
    }
    if (entrada < 1) {
      return `La calificacion debe ser mayor a 0`;
    }
    if (entrada > 100) {
      return `La calificacion no puede ser mayor a 100`;
    }
  };

  const errorMensaje = validacionName(input.name);
  const errorImage = validacionImg(input.image);
  const errorSummary = validacionSumm(input.summary);
  const errorStepByStep = validacionSbS(input.StepByStep);
  const errorDishT = validacionDishT(input.dishTypes);
  const errorDiets = validacionDiets(input.diets);
  const errorHealth = validacionHealth(input.healthScore);

  const funcionGeneral = (
    eName,
    eImage,
    eSummary,
    eStepBS,
    eDishT,
    eDiets,
    eHealth
  ) => {
    if (
      eName === undefined &&
      eImage === undefined &&
      eSummary === undefined &&
      eStepBS === undefined &&
      eDishT === undefined &&
      eDiets === undefined &&
      eHealth === undefined
    ) {
      return undefined;
    } else {
      return true;
    }
  };
  const DesactivateDisable = funcionGeneral(
    errorMensaje,
    errorImage,
    errorSummary,
    errorStepByStep,
    errorDishT,
    errorDiets,
    errorHealth
  );
  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div className="createR">
      <div className="titulo">
        <Link className="homeLink" to="/home">
          <button className="volver">🏠</button>
        </Link>
        <h1>Create Recipe</h1>
      </div>

      <div className="threeColumns">
        {input.dishTypes.length > 0 ? (
          <div className="dishTSelect">
            <h2>Selected dish types</h2>
            {input.dishTypes.map((e) => (
              <span key={e} onClick={() => handleDeleteDT(e)}>
                <button>{e}</button>
              </span>
            ))}
            <h2>touch to remove</h2>
          </div>
        ) : (
          ``
        )}
        <div className="formmm">
          <form className="create_form" onSubmit={(e) => enviarRecipe(e)}>
            <div className="nameF">
              <label> Name </label>

              <input
                id="name"
                type="text"
                name="name"
                className="inputS"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
              <div className="name-img">
                {input.name ? <span>{errorMensaje}</span> : ``}
              </div>
            </div>

            <div className="imagenF">
              <label> Image </label>
              <input
                id="image"
                type="url"
                name="image"
                className="inputS"
                value={input.image}
                onChange={(e) => handleChange(e)}
              />
              <div className="name-img">
                {input.image ? <span>{errorImage}</span> : ``}
              </div>
            </div>

            <div className="summaryF">
              <label> Summary </label>
              <textarea
                id="summary"
                type="text"
                className="inputS"
                name="summary"
                value={input.summary}
                onChange={(e) => handleChange(e)}
              />
              <div className="summ-step">
                {input.summary ? <span>{errorSummary}</span> : ``}
              </div>
            </div>

            <div className="stepBSF">
              <label> Step By Step </label>
              <textarea
                id="StepByStep"
                type="text"
                className="inputS"
                name="StepByStep"
                value={input.StepByStep}
                onChange={(e) => handleChange(e)}
              />
              <div className="summ-step">
                {input.StepByStep.length > 1 ? (
                  <span>{errorStepByStep}</span>
                ) : (
                  ``
                )}
              </div>
            </div>

            <div className="dishTF">
              <select
                id="dishTypes"
                name="dishTypes"
                className="selects"
                value={input.dishTypes}
                onChange={(e) => handleSelectDT(e)}
              >
                <option hidden>Select a Dish Types</option>
                <option disabled="disabled" default={true} value="">
                  Select a Dish Types
                </option>
                {allDishType.map((e) => {// eslint-disable-next-line
                  if (!input.dishTypes.includes(e.name)) {
                    return (
                      <option value={e.name} key={e.name}>
                        {e.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className="dietsF">
              <select
                name="diets"
                className="selects"
                value={input.diets}
                onChange={(e) => handleSelect(e)}
              >
                <option hidden>Select a Diet</option>
                <option disabled="disabled" default={true} value="">
                  Select a Diet
                </option>
                {alldiets.map((e) => {
                  if (!input.diets.includes(e.name)) {
                    return (
                      <option value={e.name} key={e.id}>
                        {e.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div className="healthSF">
              <label> Health Score </label>
              <input
                id="healthScore"
                type="range"
                name="healthScore"
                min={0}
                max={100}
                value={input.healthScore}
                onChange={(e) => handleChange(e)}
              />
              <span> {input.healthScore}</span>

              {/* <div className="healthS">
                {input.healthScore ? <span>{errorHealth}</span> : ``}
              </div> */}
            </div>

            <div className="buttons">
              <button
                className="boton_crear"
                type="submit"
                disabled={DesactivateDisable}
              >
                Create Recipe
              </button>
            </div>
          </form>
        </div>
        {input.diets.length > 0 ? (
          <div className="diets-select">
            <h2>Selected diets</h2>
            {input.diets.map((e) => (
              <p key={e} onClick={() => handleDelete(e)}>
                <button>{e}</button>
              </p>
            ))}
            <h2>touch to remove</h2>
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  );
}
