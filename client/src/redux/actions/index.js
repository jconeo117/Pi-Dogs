import axios from "axios";


export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs`, { 
        });
        return dispatch({
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    }
};

export function getTemperaments() {
  return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/temperaments`); 
      return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: json.data,
      });
    }  
};

export function FilterByTemperament(payload) {
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getBreed(payload) {
    return async function (dispatch) {
        try {
            if(/^[a-zA-Z]*$/.test(payload)){
                var json = await axios.get(`http://localhost:3001/dogs?name=${payload}`) 
                if(json.data.length>1){
                    return dispatch ({
                        type: "GET_BREED",
                        payload: json.data
                    })
                }else{
                    return alert('Breed not found')
                }
            }
        } catch (error) {
            alert('Raza no encontrada');
        }
    }
};

export function filterCreated(payload) {
    return {
      type: 'FILTER_CREATED',
      payload,
    };
  }

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function OrderByHeight(payload) {
    return { 
        type: "ORDER_BY_HEIGHT",
        payload
    }
};
export function ClearDetail() {
    return { 
        type: "CLEAR_DETAIL",
    }
};

export function getDetails(id) {
    return async function (dispatch) {
      const json = await axios.get(`http://localhost:3001/dogs/` + id);
      dispatch({
        type: 'GET_DETAILS',
        payload: json.data,
      });
    };
  }

  export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dogs", payload);
        return data;
    }
}