import _ from 'lodash';

const initialState = {
    profile: {},
    isAuthenticate: false
}

const errorReducer = (state = initialState ,action) => {
    switch(action.type){
        case "SET_CURRENT_USER":
            return {
                profile : action.profile,
                isAuthenticate: !_.isEmpty(action.profile)
            };
        default: break;
    }
    return state;
}

export default errorReducer