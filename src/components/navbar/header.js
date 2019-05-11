import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import '../../css/css_nav/mycss.css'
//
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
//
const image = require('../../img/logo.png');
// const avatar = require('../../img/default.png')
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userType: '',
        }
    }

    authenticate = () => {
        if (localStorage.getItem('jwtToken')) {
            return true;
        }
        else {
            return false;
        }
    }
    logOut = () => {
        localStorage.removeItem('jwtToken');
    }
    authorization = () => {
        if (this.authenticate()) {
            let token = localStorage.getItem('jwtToken').split(' ')[1];
            let decode = jwtDecode(token);
            return decode;
        }
        else {
            return null;
        }
    }
    render() {
        const isAuth = this.authenticate();
        const isAuthor = this.authorization();
        let role = '';
        if (isAuthor) {
            role = this.authorization().userType;
        }
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand className="col-md-2 px-auto" href="/"><img src={image} style={{ width: '80%' }} alt='' /></NavbarBrand>
                    <Nav className="item-nav" navbar style={{ marginRight: '10px' }}>
                        {
                            role === 'driver' ?
                                <NavItem>
                                    <NavLink href='/listTripDriver'>Danh sách chuyến đi</NavLink>
                                </NavItem>
                                : null
                        }
                    </Nav>
                    <Nav>
                        <NavItem>
                            {
                                role === 'driver' ?
                                    <Button color='success' href="/add-trip">Tạo chuyến đi</Button> : null
                            }
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {
                            isAuth ?
                                <Nav>
                                    <NavItem>
                                        <NavLink href="/user">Hello {isAuthor.fullname}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/login" onClick={this.logOut}>Log Out</NavLink>
                                    </NavItem>
                                </Nav>
                                :
                                <Nav>
                                    <NavItem>
                                        <NavLink href="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/register">Register</NavLink>
                                    </NavItem>
                                </Nav>
                        }
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.setStateReduxToken
    }
}
export default connect(mapStateToProps, null)(Header);