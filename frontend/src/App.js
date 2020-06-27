import React, {Component} from 'react';
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
            showHide: false,
            isNameSearch: false,
            isDateSearch: false,
            query: ""
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    loadAllStatues() {
        axios.get('http://localhost:8080/api/statues/all')
        .then(res => {
            const statueData = res.data["Items"];
            this.setState({statueData});
        })
    }

    componentDidMount() {
        this.loadAllStatues();
    }

    fetchSearchResults(query) {
        axios.get('http://localhost:8080/api/statues/name', { params: { name: query }})
        .then(res => {
            const statueData = res.data["Items"];
            this.setState({statueData});
        })
    }

    handleSearch = ( event ) => {
        const query = event.target.value;
        this.setState({query: query}, () => {this.fetchSearchResults(query)});
        console.log(this.statueData)
    }

    render() { 
        const position = [this.state.startLat, this.state.startLng];
        const { query } = this.state.query;
        console.warn(this.state.query)
        return ( 
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">no more statues</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link onClick={() => this.handleModalShowHide()}>About</Nav.Link>
                        <Nav.Link href="https://github.com/noahweingand/no-more-statues" target="_blank" rel="noopener noreferrer">Github</Nav.Link>
                        </Nav>
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={query} onChange={this.handleSearch}/>
                        <NavDropdown title="Search by" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1">Name</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Date Removed</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Removed</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Standing</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Button variant="primary">Search</Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <Modal show={this.state.showHide}>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>About</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ‘no more statues’ is an effort to track the removal of statues, monuments, and 
                        busts idolizing racists, colonizers, and confederates across the globe. George Floyd’s murder 
                        has incited a demand for real change across the globe and proves we have a long battle ahead of us.
                        <p></p>
                        All locations automatically appear on the map. To search, select what to search by at the top right
                        and type your search in the search bar. 'Removed' and 'Standing' will return all statues removed or standing.
                        <p></p>
                        Movements like the ones going on right now rely heavily on funding for memorials, communities, and bails.
                        Below are some resources for donating. Please consider.
                        <p></p>
                        <ul>
                            <li><a href="https://nymag.com/strategist/article/where-to-donate-for-black-lives-matter.html">General Resource</a></li>
                            <li><a href="https://www.communityjusticeexchange.org/nbfn-directory">National Bail Fund Network</a></li>
                        </ul>
                    </Modal.Body>
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
