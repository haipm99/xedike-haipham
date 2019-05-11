const initialize = '';

const setStateReduxToken = (state = initialize,action) =>{
    switch(action.type) {
         case 'SET_STATE_TOKEN':
            const newState = action.value;
            console.log(newState);
            return newState;
        default:
         break;
    }
    return state
}

export default setStateReduxToken;