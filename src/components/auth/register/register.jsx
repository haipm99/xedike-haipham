import React, { Component } from 'react';
import '../../../css/css_login/login.css';
import { Row, Col, Form, InputGroup, InputGroupAddon, Input, Button, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../../../action/auth';
import swal from 'sweetalert';
class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            fullname: '',
            phone: '',
            DOB: '',
            userType: '',
            errors: {},
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.userType !== "") {
            const check = await this.props.registerUser(this.state);
            if (check === 200) {
                swal('Register Success !', '', 'success');
                window.location.href = '/login';
            }
        }
        else{
            swal('user type not found','','error');
        }
    }
    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps.errors)
        this.setState({
            errors: nextProps.errors,
        });
    }
    render() {
        return (
            <div className="container-login">
                <div className="login-form">
                    <Row>
                        <Col></Col>
                        <Col><h1 className="login-h1">Register</h1></Col>
                        <Col></Col>
                    </Row>
                    <Form className="form-input">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-alt' style={{ color: 'gray', fontSize: '35px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="email" id="email" placeholder="Enter your email" onChange={this.onChange}
                                invalid={this.state.errors.email || this.state.errors.msg ? true : false} />
                            <FormFeedback>{this.state.errors.email ? this.state.errors.email : null}</FormFeedback>
                            <FormFeedback>{this.state.errors.msg ? this.state.errors.msg : null}</FormFeedback>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="password" id="pass1" placeholder="Enter your password" onChange={this.onChange}
                                invalid={this.state.errors.password ? true : false} />
                            <FormFeedback>{this.state.errors.password ? this.state.errors.password : null}</FormFeedback>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="password2" id="pass2" placeholder="Confirm your password" onChange={this.onChange}
                                invalid={this.state.errors.password ? true : false} />
                            <FormFeedback>{this.state.errors.password ? this.state.errors.password : null}</FormFeedback>
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="fullname" id="fullname" placeholder="Fullname" onChange={this.onChange} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="phone" id="phone" placeholder="Phone" onChange={this.onChange} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input type="text" name="DOB" id="DOB" placeholder="DOB" onChange={this.onChange} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            {/* <Input type="text" name="userType" id="userType" placeholder="userType" onChange={this.onChange} /> */}
                            <Input type="select" name="userType" id="exampleSelect" onChange={this.onChange}>
                                <option value="">chọn type</option>
                                <option value="passenger">passenger</option>
                                <option value="driver">driver</option>
                            </Input>
                        </InputGroup>
                        <br />
                        <Row>
                            {/* <Col></Col> */}
                            <Col xs="8" sm="6">
                                <Button color="danger" style={{ marginRight: "5px" }} onClick={this.onSubmit}>Register</Button>
                                <Button color="success"><a href='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</a></Button>
                            </Col>
                            {/* <Col xs="4" sm="6"><Button color="primary">Reset PassWord</Button></Col> */}
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}
export default connect(mapStateToProps, { registerUser })(register);