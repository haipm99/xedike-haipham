import React, { Component } from 'react';
import '../../css/css_addTrip/addTrip.css'
import jwtDecode from 'jwt-decode';
import mongoose from 'mongoose';
//import component
import NavBar from '../navbar/header';
import axios from 'axios';
import { Form, Input, FormGroup, Label, Button } from 'reactstrap';
//sweet alert 
import swal from 'sweetalert';
class addTrip extends Component {
    constructor(props) {
        super(props);
        var objectId = mongoose.Types.ObjectId(this.authorization().id);
        this.state = {
            driverId: objectId,
            locationFrom: '',
            locationTo: '',
            fee: '',
            startTime: '',
            availableSeats: '',
        }
    }
    authorization = () => {
        if (localStorage.getItem('jwtToken')) {
            let token = localStorage.getItem('jwtToken').split(' ')[1];
            let decode = jwtDecode(token);
            return decode;
        }
        else {
            return null;
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        let check = await this.createTrip(this.state);
        if (check === 200) {
            await swal("Create trip success !", "", "success");
            window.location.href = "/"
        }
    }
    createTrip = (data) => {
        return (
            axios.post('https://haiphamxedike.herokuapp.com/api/trips/create', data, {
            Headers: { Authorization: localStorage.getItem('jwtToken'), 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(res => {
                console.log(res.status);
                return res.status
            }).catch(console.log)
            );
    }
    render() {

        return (
            <div className="container-add-trip">
                <NavBar />
                <div className="info-newtrip-addTrip">
                    <Form>
                        <FormGroup>
                            <Label>Location From:</Label>
                            <Input type="text" name="locationFrom" id="locationFrom" placeholder="" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Location To:</Label>
                            <Input type="text" name="locationTo" id="locationTo" placeholder="" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Start Time:</Label>
                            <Input type="text" name="startTime" id="startTime" placeholder="" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Seats:</Label>
                            <Input type="text" name="availableSeats" id="availableSeats" placeholder="" onChange={this.onChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fee:</Label>
                            <Input type="text" name="fee" id="fee" placeholder="" onChange={this.onChange} />
                        </FormGroup>
                        <Button color='success' style={{ marginRight: '5px' }} onClick={this.onSubmit}>Create Trip</Button>
                        <Button color='danger' >Cancel</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default addTrip;