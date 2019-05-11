import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../css/css_footer/footer.css';
class footer extends Component {
    render() {
        return (
            <div className="container-footer">
                <Container>
                    <Row>
                        <Col xs="6" sm="4">
                            <h5>Branch</h5>
                            <ul>
                                <li>60-60A Phan Xích Long</li>
                                <li>140C Nguyễn Trọng Tuyển</li>
                                <li>155-157 Trần Quốc Thảo</li>
                            </ul>
                        </Col>
                        <Col xs="6" sm="4">
                            <h5>Benefits</h5>
                            <ul>
                                <li>Book calendar</li>
                                <li>Online learning</li>
                                <li>Storage of documents</li>
                            </ul>
                        </Col>
                        <Col sm="4">
                            <h5>Benefit</h5>
                            <ul>
                                <li>Book calendar</li>
                                <li>Book calendar</li>
                                <li>Book calendar</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default footer;