import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../css/css_detail/detail.css';

class detail extends Component {
    render() {
        return (
            <div className="container-detail">
                <Container>
                    <Row>
                        <div className="content-detail-top">
                            <center>
                                <h3>Tại sao lại sử dụng xe đi ké ?</h3>
                            </center>
                        </div>
                    </Row>
                    <Row>
                        <Col xs="6" sm="4">
                            <div className="div-detail-1">
                                <Row style={{ padding: '15px' }}>
                                    <h5 style={{ color: 'white' }}>Tin tưởng</h5>
                                    <img src={require('../../img/like.png')} alt="" style={{ width: '35px', height: '35px', marginLeft: '10px' }} />
                                </Row>
                                <h6 style={{ color: 'white' }}>
                                    Bạn sẽ biết tài xế và bạn đồng hành của bạn là ai.
                                    Điều đó giúp bạn có những trải nghiệm tốt hơn trên hành trình của mình.
                                </h6>
                            </div>
                        </Col>
                        <Col xs="6" sm="4">
                            <div className="div-detail-1">
                                <Row style={{ padding: '15px' }}>
                                    <h5 style={{ color: 'white' }}>Chủ động</h5>
                                    <img src={require('../../img/shield.png')} alt="" style={{ width: '35px', height: '35px', marginLeft: '10px' }} />
                                </Row>
                                <h6 style={{ color: 'white' }}>
                                    Thời gian chờ, số ghế trống, giá cả, chất lượng tài xế, các đánh giá, …
                                    tất cả sẽ được hiển thị rõ ràng để bạn yên tâm đặt chuyến đi
                                </h6>
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="div-detail-1">
                                <Row style={{ padding: '15px' }}>
                                    <h5 style={{ color: 'white' }}>Môi trường</h5>
                                    <img src={require('../../img/car.png')} alt="" style={{ width: '35px', height: '35px', marginLeft: '10px' }} />
                                </Row>
                                <h6 style={{ color: 'white' }}>
                                    Mỗi 2 người đi chung một xe tương đương với việc trồng 4 cây xanh cho
                                    việc hấp thụ khí C02 trong vòng 1 năm.
                                </h6>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default detail;