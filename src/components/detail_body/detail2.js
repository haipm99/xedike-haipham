import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../css/css_detail/detaile2.css'
class detail2 extends Component {
    render() {
        return (
            <div className="container-detail-2" style={{ backgroundSize: 'cover' }}>
                <Container>
                    <Row style={{marginBottom:'15px'}}>
                        <Col xs="6" sm="6">
                            <div className="div-content-detail2">
                                <h4>658 hành khách</h4>
                                <h6>Hàng nghìn lượt khách tin tưởng chúng tôi để tìm những chuyến xe với chất lượng tốt nhất.</h6>
                            </div>
                        </Col>
                        <Col xs="6" sm="6">
                            <div className="div-content-detail2">
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" sm="6">
                            <div className="div-content-detail2">
                            </div>
                        </Col>
                        <Col xs="6" sm="6">
                            <div className="div-content-detail2">
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default detail2;