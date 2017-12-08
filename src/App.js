import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';

import Map from './Map.js';
import GeoFeature from './GeoFeature.js';
import VectorFeature from './VectorFeature.js';
import QuakeFeature from './QuakeFeature.js';
import Basemap from './Basemap.js';
import OpacitySlider from './OpacitySlider.js';
import Checkbox from 'material-ui/Checkbox';

class App extends Component {
  state = {
    sliderValue: 0.5,
    magenta: {
      isLayerChecked: false
    },
    navy: {
      isLayerChecked: false
    },
    red: {
      isLayerChecked: false
    },
    blue: {
      isLayerChecked: false
    }
  }

  handleSlider = (event, value) => {
    this.setState({sliderValue: value});
  }

  handleCheckbox = (event, isInputChecked) => {
    this.setState({
      [event.target.value]: {
        isLayerChecked: isInputChecked
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h1 className="App-title">Layered mapping with React and MapBox GL</h1>
          </div>
          <p className="App-intro">
            End-of-semester project for HackCville's Source program showcase.
          </p>
          <div>
            <Map>
              <GeoFeature
                id = 'sourceId'
                type = 'geojson'
                data = 'https://dl.dropboxusercontent.com/s/my748ofmo9pu9tu/raill_usa.json?dl=0'
                layerType = 'line'
                paint = {{
                  "line-color": 'magenta',
                  "line-width": 1
                }}
                sliderValue = {this.state.sliderValue}
                isLayerChecked = {this.state.magenta.isLayerChecked}
              ></GeoFeature>
              <VectorFeature
                id = 'sourceId2'
                type = 'vector'
                data = 'mapbox://mapbox.mapbox-terrain-v2'
                layerType = 'line'
                sourceLayer = 'contour'
                paint = {{
                  "line-color": 'navy',
                  "line-width": 1
                }}
                sliderValue = {this.state.sliderValue}
                isLayerChecked = {this.state.navy.isLayerChecked}
              ></VectorFeature>
              <QuakeFeature
                id = 'sourceId3'
                type = 'geojson'
                data = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
                layerType = 'circle'
                sliderValue = {this.state.sliderValue}
                isLayerChecked = {this.state.red.isLayerChecked}
              ></QuakeFeature>
              <Basemap
                isLayerChecked = {this.state.blue.isLayerChecked}
              ></Basemap>
            </Map>
            <OpacitySlider
              handleSlider = {this.handleSlider}
              sliderValue = {this.state.sliderValue}
            />
            <div>
              <Checkbox
                label = 'Re-color water'
                onCheck = {this.handleCheckbox}
                checked = {this.state.blue.isLayerChecked}
                value = 'blue'
              />
              <Checkbox
                label = 'Show U.S. railway lines'
                onCheck = {this.handleCheckbox}
                checked = {this.state.magenta.isLayerChecked}
                value = 'magenta'
              />
              <Checkbox
                label = 'Show elevation contours'
                onCheck = {this.handleCheckbox}
                checked = {this.state.navy.isLayerChecked}
                value = 'navy'
              />
              <Checkbox
                label = 'Show quakes (past 30 days, USGS.gov live feed)'
                onCheck = {this.handleCheckbox}
                checked = {this.state.red.isLayerChecked}
                value = 'red'
              />
              <Checkbox
                label = '(To-do) Show all 60,000+ firearms dealers in the U.S.'
                onCheck = {this.handleCheckbox}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
