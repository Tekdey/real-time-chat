const INITIAL_STATE = {
  allRoom: [],
};

function DataRoomsReducer(state = INITIAL_STATE, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "NEW__ROOM":
      const newArr = [...state.allRoom];
      newArr.push(action.payload);

      return {
        allRoom: action.payload,
      };
  }

  return state;
}

export default DataRoomsReducer;
