import axios from 'axios';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
// import calcFinger from '../utils/caculateFinger';
export const registerUser = (data) => {
    return (dispatch) => {
        return (axios.post('https://haiphamxedike.herokuapp.com/api/users/register', data)
            .then(res => { dispatch(getError({})); return res.status })
            .catch(err => {
                // if (err && err.response) {
                //     dispatch(getError(err.response.data));
                // }
                dispatch(getError(_.get(err, 'response.data')));
            }))
    }
}
export const LoginUser = (data) => {
    return (dispatch) => axios.post('https://haiphamxedike.herokuapp.com/api/users/login', data)
        .then(res => {
            // console.log(res.data.token)
            localStorage.setItem('jwtToken', res.data.token);
            //decode token
            const decoded = jwtDecode(res.data.token);
            //save in redux
            // console.log(decoded);
            dispatch(setCurrentUser(decoded));
            return res.data.token
        })
        .catch(err => {
            dispatch(getError(_.get(err, 'response.data')));
            return "";
        })
}
export const getError = (err) => {
    return ({
        type: "GET_ERRORS",
        err
    })
}

export const setCurrentUser = (profile) => {
    return ({
        type: "SET_CURRENT_USER",
        profile
    })
}