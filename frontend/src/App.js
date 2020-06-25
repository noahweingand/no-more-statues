import React, {Component} from 'react';
import './App.css';
//import Main from './components/Main.js';
import 'leaflet/dist/leaflet.css'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

class App extends Component {
  state = {
      lat: 30,
      lng: -20,
      zoom: 2,
  }
  render() { 
      const position = [this.state.lat, this.state.lng];
      return ( 
          <div>
              <h1>Hello No-More-Statues!</h1>
              <Map style={{ width: '100%', height: '600px' }} center={position} zoom={this.state.zoom}>
                  <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                  <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                  </Marker>
              </Map> 
          </div>
      );
  }
}

export default App;
