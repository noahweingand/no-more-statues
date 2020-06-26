import React, {Component, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import MapIcon from './img/mapIcon.png';
import {Navbar, Nav, NavDropdown, Button, FormControl, Form, Modal } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startLat: 30,
            startLng: -20,
            startZoom: 2.5,
            statueData: [],
            mapIcon: L.icon({
                iconUrl: MapIcon,
                iconSize:     [50, 50], // size of the icon
                iconAnchor:   [0, 0], // 10,15 point of the icon which will correspond to marker's location
                popupAnchor:  [25, 0] //-3,-10
            }),
            showHide: false
        }
    }
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    componentDidMount() {
        axios.get('http://localhost:8080/api/statues/all')
        .then(res => {
            const statueData = res.data["Items"];
            this.setState({statueData});
        })
    }
    render() { 
        const position = [this.state.startLat, this.state.startLng];
        return ( 
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">no more statues</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.handleModalShowHide()}>About</Nav.Link>
                        <Nav.Link href="https://github.com/noahweingand/no-more-statues" target="_blank">Github</Nav.Link>
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <NavDropdown title="Search by" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1">Statue</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Date Removed</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Removed</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Standing</NavDropdown.Item>
                        </NavDropdown>
                        <Button variant="primary">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>About</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Hello, this is blah blah BLM</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Map style={{ width: '100%', height: '600px' }} center={position} zoom={this.state.startZoom}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.statueData.map((statues, idx) =>
                    <Marker icon={this.state.mapIcon} key={`statue-${idx}`} position={[statues["coordinates"]["lat"], [statues["coordinates"]["long"]]]}>
                        <Popup>
                            <a target="_blank" href={statues["ref"]} >{statues["name"]}</a>
                            <p>Removed: {statues["removalDate"]}</p>
                        </Popup>
                    </Marker>
                    )};
                </Map> 
            </div>
        );
    } 
}

export default App;
