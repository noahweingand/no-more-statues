import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import MapIcon from 'leaflet/dist/images/marker-icon.png';
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
                iconSize:     [25, 30], // size of the icon
                iconAnchor:   [0, 0], // 10,15 point of the icon which will correspond to marker's location
                popupAnchor:  [12, 0] //-3,-10
            }),
            showHide: false,
            isNameSearch: false,
            isDateSearch: false,
            isRemovedSearch: false,
            isStandingSearch: false,
            query: ""
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    loadAllStatues() {
        axios.get('https://api.nomorestatues.com/api/statues/all')
        .then(res => {
            const statueData = res.data["Items"];
            this.setState({statueData});
        })
    }

    componentDidMount() {
        this.loadAllStatues();
    }

    fetchSearchResults(query) {
        if (this.state.isNameSearch === true) {
            axios.get('https://api.nomorestatues.com/api/statues/name', { params: { name: query }})
            .then(res => {
                const statueData = res.data["Items"];
                this.setState({statueData});
            })
        }
        else if (this.state.isDateSearch === true) {
            axios.get('https://api.nomorestatues.com/api/statues/date', { params: { date: query }})
            .then(res => {
                const statueData = res.data["Items"];
                this.setState({statueData});
            })
        }
    }

    handleSearch = ( event ) => {
        const query = event.target.value;
        this.setState({query: query}, () => {this.fetchSearchResults(query)});
    }

    onNameClick = () => {
        this.setState({isNameSearch: true, isDateSearch: false, isRemovedSearch: false, isStandingSearch: false});
    }

    onDateClick = () => {
        this.setState({isNameSearch: false, isDateSearch: true, isRemovedSearch: false, isStandingSearch: false});
    }

    onRemovedClick = () => {
        this.setState({isDateSearch: false, isNameSearch: false, isRemovedSearch: true, isStandingSearch: false});
        axios.get('https://api.nomorestatues.com/api/statues/standing', { params: { not: true }})
            .then(res => {
                const statueData = res.data["Items"];
                this.setState({statueData});
            })
    }

    onStandingClick = () => {
        this.setState({isDateSearch: false, isNameSearch: false, isRemovedSearch: false, isStandingSearch: true});
        axios.get('https://api.nomorestatues.com/api/statues/standing', { params: { not: false }})
            .then(res => {
                const statueData = res.data["Items"];
                this.setState({statueData});
            })
    }

    render() { 
        const position = [this.state.startLat, this.state.startLng];
        const { query } = this.state.query;
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
                            <NavDropdown.Item onClick={this.onNameClick}>Name</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.onDateClick}>Date Removed</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.onRemovedClick}>Removed</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.onStandingClick}>Standing</NavDropdown.Item>
                        </NavDropdown>
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
                        and type your search in the search bar. For date search, format it as 'yyyy-mm-dd', and for name, try lowercase.
                        'Removed' and 'Standing' will return all statues removed or standing.
                        <p></p>
                        Movements like the ones going on right now rely heavily on funding for memorials, communities, and bails.
                        Below are some resources for donating. Please consider.
                        <p></p>
                        <ul>
                            <li><a href="https://nymag.com/strategist/article/where-to-donate-for-black-lives-matter.html">Where to donate</a></li>
                            <li><a href="https://www.communityjusticeexchange.org/nbfn-directory">National Bail Fund Network</a></li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Map style={{ width: window.innerWidth, height: window.innerHeight}} center={position} zoom={this.state.startZoom}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.statueData.map((statues, idx) =>
                        <Marker icon={this.state.mapIcon} key={`statue-${idx}`} position={[statues["coordinates"]["lat"], [statues["coordinates"]["long"]]]}>
                            <Popup>
                                <a target="_blank" href={statues["ref"]} >{statues["name"]}</a>
                                <p>Removed: {statues["removed"] ? statues["removalDate"] : 'No'}</p>
                            </Popup>
                        </Marker>
                    )};
                </Map> 
            </div>
        );
    } 
}

export default App;
