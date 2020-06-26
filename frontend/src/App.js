import React, {Component} from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import MapIcon from './img/mapIcon.png'

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
            })
        }
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
                <h1>No More Statues</h1>
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
