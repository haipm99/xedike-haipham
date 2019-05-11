import React, { Component } from 'react';
import NavBar from '../navbar/header'
import '../../css/css_listTripDriver/listTrip.css'
import { Table, Button } from 'reactstrap';
//
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import swal from 'sweetalert';
// import { Alert } from 'reactstrap';
class listTripDriver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            currentTrip: {},
        }
    }
    getUser = () => {
        let token = localStorage.getItem('jwtToken');
        let user = jwtDecode(token);
        return user
    }
    getDataTrip = async () => {
        let id = this.getUser().id;
        return (axios.get(`https://haiphamxedike.herokuapp.com/api/trips/getTripOf/${id}`)
            .then(res => {
                this.setState({
                    trips: res.data
                })
                return res.data
            }).catch(console.log))
    }
    componentDidMount = () => {
        this.getDataTrip();
    }
    //delete Trip 
    deleteTrip = (item) => {
        console.log(item._id)
        return (
            axios.get(`https://haiphamxedike.herokuapp.com/api/trips/delete-trip/${item._id}`)
                .then(async res => {
                    console.log(res.status)
                    if (res.status === 200) {
                        await swal("Delete trip success !", "", "success");
                        this.getDataTrip();
                    }
                }).catch(console.log)
        )
    }
    //finish trip 
    finishtrip = (trip) => {
        return (
            axios.get(`https://haiphamxedike.herokuapp.com/api/trips/finish/${trip._id}`)
                .then(async res => {
                    console.log(res.status);
                    if (res.status === 200) {
                        await swal("Finish this trip !", "", "success");
                        this.getDataTrip();
                    }
                })
        )
    }
    render() {
        const element = this.state.trips.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.locationFrom}</td>
                    <td>{item.locationTo}</td>
                    <td><Button color="success" onClick={this.finishtrip.bind(this, item)}>Finish</Button></td>
                    <td><Button color="danger" onClick={this.deleteTrip.bind(this, item)}>Delete</Button></td>
                    <td>
                        {
                           item.isFinish ?
                            <Button color ='success'>Finished</Button>
                            :
                            <Button color='danger'>Not Finished</Button>        
                        }
                    </td>
                </tr>
            )
        })
        return (
            <div className="container-list-trip-driver">
                <NavBar />
                <div className="box-trip">
                    <Table striped dark>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>From</th>
                                <th>To</th>
                                <th></th>
                                <th></th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {element}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default listTripDriver;