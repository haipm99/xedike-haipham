import React, { Component } from 'react';
import '../../../css/css_login/login.css'
import { Row, Col, Form, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import axios from 'axios';
// import { LoginUser } from '../../../action/auth';
import { connect } from 'react-redux';
// import { setTokenStateRedux } from '../../../action/setTokenInRedux';
import { LoginUser } from '../../../action/auth';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    logInFunc = async (data) => {
        return (
            axios.post('https://haiphamxedike.herokuapp.com/api/users/login', data)
                .then(mydata => {
                    // console.log(res)
                    localStorage.setItem('jwtToken', mydata.data.token);
                    return mydata.data.token
                })
                .catch(console.log)
        );
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const token = await this.logInFunc(this.state);
        // const token = await this.props.LoginUser(this.state);
        console.log(token);
        // this.props.setStateReduxToken(token)
        if (localStorage.getItem('jwtToken')) {
            window.location = '/';
        }
    }
    render() {
        return (
            <div className="container-login">
                <div className="login-form">
                    <Row>
                        <Col></Col>
                        <Col><h1 className="login-h1">Login</h1></Col>
                        <Col></Col>
                    </Row>
                    <Form className="form-input">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-alt' style={{ color: 'gray', fontSize: '35px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input placeholder="Enter your email" name="email" id="email" onChange={this.onChange} />
                        </InputGroup>
                        <br /><br />
                        <InputGroup>
                            <InputGroupAddon addonType="prepend"><i className='fas fa-user-shield' style={{ color: 'gray', fontSize: '30px', marginRight: '5px' }}></i></InputGroupAddon>
                            <Input placeholder="Enter your password" name="password" id="password" onChange={this.onChange} />
                        </InputGroup>
                        <br /><br />
                        <Row>
                            {/* <Col></Col> */}
                            <Col xs="8" sm="6">
                                <Button color="success" style={{ marginRight: "5px" }} onClick={this.onSubmit}>Login</Button>
                                <Button color="danger"><a href='/register' style={{ textDecoration: 'none', color: 'white' }}>Register</a></Button>
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
        token: state.setStateReduxToken
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         setStateReduxToken: (value) => {
//             dispatch(setTokenStateRedux(value))
//         },
//     }
// }
export default connect(mapStateToProps, { LoginUser })(login);