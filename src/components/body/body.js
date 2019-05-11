import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Table,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Alert,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import swal from 'sweetalert';
import Nav from '../navbar/header';
import Detail from '../detail_body/detail';
import FooterComponent from '../footer/footer';
import '../../css/css_slideshow/slideshow.css';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import mongoose from 'mongoose';
//import data redux
import { connect } from 'react-redux';
import { getData } from '../../action/data';
const imgsrc = require('../../img/slide1.jpg');
const items = [
  {
    src: imgsrc,
  },
  {
    src: require('../../img/slide2.jpg'),
  },
  {
    src: require('../../img/slide3.jpg'),
  }
];
class body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      infoModal: {},
      data: [],
      passengerOfTrip: [],
      modal: false,
      nestedModal: false,
      closeAll: false,
      locationGetIn: '',
      locationGetOff: '',
      numberOfSeatsBook: '',
      paymentMethod: '',
      driverName: '',
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }
  //toggle modal
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }
  setInfo = async (item) => {
    await this.setState({
      infoModal: item
    });
    // console.log(this.state.infoModal.passenger)
    let namedriver = await this.getPassenger(this.state.infoModal.driverId);
    // console.log(namedriver.data.fullname)
    await this.setState({
      driverName: namedriver.data.fullname
    })
    this.loopArrayPassengr();
    this.toggle();
  }
  componentDidMount = async () => {
    this.getDataFromDB();
    // this.loopArrayPassengr();
  }
  //loop get array passenger
  loopArrayPassengr = async () => {
    if (this.state.infoModal) {

      let arrPassenger = [];
      for (const item of this.state.infoModal.passenger) {
        let fullname = await this.getPassenger(item.userId);
        arrPassenger.push(fullname.data.fullname);
      }
      console.log(arrPassenger)
      // this.state.infoModal.passenger.forEach( async (passenger) => {
      //     let fullname = await this.getPassenger(passenger.userId);
      //     arrPassenger.push(fullname);
      // });
      this.setState({
        passengerOfTrip: arrPassenger
      })
    }
  }
  getPassenger = (id) => {
    return (
      axios.get(`https://haiphamxedike.herokuapp.com/api/users/users/${id}`)
    )
  }
  getDataFromDB = async () => {
    return (
      await axios.get('https://haiphamxedike.herokuapp.com/api/trips')
        .then(res => {
          this.setState({
            data: res.data.trip
          }); return (res.data.trip)
        })
        .catch(console.log)
    )
  }
  checkLogin = () => {
    if (this.props.token) {
      return true;
    }
    return false;
  }
  //book trip
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('jwtToken');
    let user = jwtDecode(token);
    let data = {
      userId: mongoose.Types.ObjectId(user.id),
      locationGetIn: this.state.locationGetIn,
      locationGetOff: this.state.locationGetOff,
      paymentMethod: this.state.paymentMethod,
      numberOfSeatsBook: this.state.numberOfSeatsBook
    }
    let check = await this.bookTrip(data, this.state.infoModal._id);
    if (check === 200) {
      swal('Book success!', '', 'success');
    }
  }
  bookTrip = (data, idtrip) => {
    return (axios.post(`https://haiphamxedike.herokuapp.com/api/trips/book/${idtrip}`, data)
      .then(res => { console.log(res); this.toggleAll(); this.getDataFromDB();return res.status })
      .catch(console.log));
  }

  ///////
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  //authenticate
  isLogin = () => {
    if(localStorage.getItem('jwtToken')){
      return true;
    }
    return false;
  }
  render() {
    const { activeIndex } = this.state;
    const checkLogin = this.isLogin();
    const tableWithData = this.state.data.map((item, index) => {
      return (
        item.isFinish ?
          null
          : <tr>
            <th scope="row">{index + 1}</th>
            <td>{item.locationFrom}</td>
            <td>{item.locationTo}</td>
            <td><Button color="danger" onClick={this.setInfo.bind(this, item)}>More Detail</Button></td>
          </tr>
      )
    })
    const slides = items.map((item, index) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        // style= {{backgroundImage:item.src}}
        >
          <img src={item.src} alt='' className="img-slide" />
        </CarouselItem>
      );
    });
    console.log(this.state.passengerOfTrip)
    const listPassenger = this.state.passengerOfTrip.map((item, index) => {
      return (
        <Alert color='primary'>{item}</Alert>
      )
    })
    return (
      <div className="container-slide-show" style={{ position: 'relative' }}>
        <Nav />
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <div className="box-trip">
          <center><h4 style={{ color: 'white' }}>Danh sách chuyến đi</h4></center>
          <Table striped dark>
            <thead>
              <tr>
                <th>STT</th>
                <th>From</th>
                <th>To</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {tableWithData}
            </tbody>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{this.state.infoModal.locationFrom}---{this.state.infoModal.locationTo}</ModalHeader>
              <ModalBody>
                <td>Tài Xế: <Alert color='success'>{this.state.driverName}</Alert></td>
                <h4>Giá: {this.state.infoModal.fee}</h4>
                <h4>Chỗ còn lại: {this.state.infoModal.availableSeats}</h4>
                <h4>Danh sách hành khách :</h4>
                {listPassenger}
                <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                  <ModalHeader>Book this trip</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label>Location Get In:</Label>
                        <Input type="text" name="locationGetIn" id="locationGetIn" placeholder="" onChange={this.onchange} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Location Get Out:</Label>
                        <Input type="text" name="locationGetOff" id="locationGetOff" placeholder="" onChange={this.onchange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">Payment Method</Label>
                        <Input type="text" name="paymentMethod" id="paymentMethod" placeholder="" onChange={this.onchange} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">Number Of Seats Book:</Label>
                        <Input type="text" name="numberOfSeatsBook" id="numberOfSeatsBook" placeholder="" onChange={this.onchange} />
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit}>Đặt</Button>
                    <Button color="secondary" onClick={this.toggleAll}>Trở về</Button>
                  </ModalFooter>
                </Modal>
              </ModalBody>
              <ModalFooter>
              {
                      checkLogin ?
                      <Button color="primary" onClick={this.toggleNested}>Đặt Chỗ</Button>
                      :null
                    }
                <Button color="secondary" onClick={this.toggle}>Quay Lại</Button>
              </ModalFooter>
            </Modal>
            <Modal>

            </Modal>
          </Table>
        </div>
        <Detail />
        <FooterComponent />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.setStateReduxToken
  }
}
export default connect(mapStateToProps, { getData })(body);