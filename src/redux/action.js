import axios from "axios";
const url = process.env.REACT_APP_BACK_URL;


export function getRecipes() {
  return async function (dispatch) {
    const response = await axios.get(`${url}/recipes`);
    dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${url}/recipes?name=${name}`
      );
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getRecipesById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${url}/recipes/${id}`);
      return dispatch({
        type: "RECIPES_DETAILS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function orderByHealthScore(payload) {
  return {
    type: "ORDER_BY_HEALTH_SCORE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function getDiets() {
  return async function (dispatch) {
    const response = await axios.get(`${url}/diets`);
    dispatch({
      type: "GET_DIETS",
      payload: response.data,
    });
  };
}

export function createRecipes(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${url}/recipes`,
        payload
      );
      return dispatch({
        type: "CREATE_RECIPES",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function clearDetails() {
  return {
    type: "CLEAR_DETAILS",
  };
}

export function filterDiet(payload) {
  return {
    type: "FILTER_DIET",
    payload,
  };
}
export function error(payload) {
  return async function (dispatch) {
    return dispatch({
      type: "ERROR",
      payload,
    });
  }
}
export function clearError(){
  return{
    type: "CLEAR_ERROR"
  }
}


