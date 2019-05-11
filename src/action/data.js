import axios from 'axios';

export const getData = () => {
    return (dispatch) => {
        axios.get('http://localhost:5000/api/trips')
              .then(res => {return(res.data.trip)})
              .catch(console.log);
    }
};
