import React, { Component } from 'react';
import '../../css/css_profile/css_profile.css'
//import component
import Nav from '../navbar/header';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import mongoose from 'mongoose'
import swal from 'sweetalert';
class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            fullname: '',
            DOB: '',
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() { 
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    getInfoUser = () => {
        if (localStorage.getItem('jwtToken') !== null) {
            let token = localStorage.getItem('jwtToken');
            const user = jwtDecode(token);
            return user;
        }
        return null
    }
    //set data
    componentDidMount  = () =>{
        this.setState({

        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async () => {
        let user = this.authenticate();
        let data = {
            fullname : this.state.fullname,
            DOB: this.state.DOB,
            userId : mongoose.Types.ObjectId(user.id)
        }
        let checkUpdate = await this.updateUser(data);
        console.log(checkUpdate);   
        if(checkUpdate === 200){
            await swal('Update success','','success');
            await swal('Logout to see your new information');
           this.toggle();
           localStorage.removeItem('jwtToken');
           window.location.href="/login";
        }
        else {
            await swal('update have error !','','danger');
        }
    }   
    //
    authenticate = () => {
        let token = localStorage.getItem('jwtToken');
        let user = jwtDecode(token);
        return user;
    }
    updateUser = (data) => {
        return (
            axios.post('https://haiphamxedike.herokuapp.com/api/users/update',data)
                .then(res => {
                    console.log(res.status);
                    return res.status
                })
                .catch(console.log)
        )
    }
    render() {
        const user = this.getInfoUser();
        return (
            <div className="container-profile">
                <Nav />
                <div className="profile1">
                    <Alert color="success">
                        Thông tin của bạn
                    </Alert>
                    <Alert color="primary">
                        Tên: {user.fullname}
                    </Alert>
                    <Alert color="primary">
                        Email: {user.email}
                    </Alert>
                    <Alert color="primary">
                        Phone: {user.phone}
                    </Alert>
                    <Alert color="primary">
                        DOB: {user.DOB}
                    </Alert>
                    <Alert color="primary">
                        userType: {user.userType}
                    </Alert>
                </div>
                <div className="profile2">
                    <Alert color="primary">
                        Ngày đăng ký: {user.RegisterDate}
                    </Alert>
                    <Button color="success" onClick={this.toggle}>Edit Profile</Button>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Edit user {user.fullname}</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Email</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="email" value={user.email} disabled/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Fullname</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="fullname" placeholder={user.fullname} onChange = {this.onChange}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Phone</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="phone" value={user.phone} disabled/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>DOB</Label>
                                        <Col sm={10}>
                                            <Input type="text" name="DOB" placeholder={user.DOB} onChange = {this.onChange}/>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.onSubmit}>Update</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default profile;