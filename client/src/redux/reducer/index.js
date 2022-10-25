const intialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
};

const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      const filteresTemp = action.payload.filter((temp) => temp.name !== ""); 
      return {
        ...state,
        temperaments: filteresTemp,
      };

    case "GET_FILTER_TEMPERAMENTS":
      const allDogs = state.allDogs;
      const statusFilter =
        action.payload === "Todos"
          ? allDogs
          : allDogs.filter((d) => d.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: statusFilter,
      };
    case "GET_BREED":
      return {
        ...state,
        dogs: action.payload,
      };
    case "ORDER_BY_NAME":
      const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };

    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };

    case "ORDER_BY_HEIGHT":
      const sortedHeight =
        action.payload === "min_height"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.height[1]) > parseInt(b.height[1])) {
                return 1;
              }
              if (parseInt(b.height[1]) > parseInt(a.height[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.height[1]) > parseInt(b.height[1])) {
                return -1;
              }
              if (parseInt(b.height[1]) > parseInt(a.height[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedHeight,
      };
    case 'GET_DETAILS':
      return {
          ...state,
          details: action.payload,
        };

    case 'FILTER_CREATED':
      const createdDogs = state.dogs;
      const createFilter =
        action.payload === "created" 
          ? createdDogs.filter((dog) => dog.CreatedInDb)
          : createdDogs.filter((dog) => !dog.CreatedInDb)
        return{
          ...state,
          dogs: action.payload === 'all' ? state.allDogs : createFilter
        };

    case'CLEAR_DETAIL':
    return{
      ...state,
      details:{}
    }
    default:
      return state;
  }
};

export default rootReducer;

// 