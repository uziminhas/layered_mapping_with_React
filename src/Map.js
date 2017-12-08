import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxCSS from 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react'; {/* allows you to type class Map extends component instead of React.component*/}

class Map extends Component {

  state = { map: {} };

  componentDidMount() {

    MapboxGl.accessToken = 'pk.eyJ1IjoidXppbWluaGFzIiwiYSI6ImNqOXN4azh2ODBmOGwyeHBjM3JzeWRmczIifQ.GMH7pOU2mmiXhof8h5B1fQ';

    const map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/light-v9',
      //center: [-78.4767, 38.0293],
      //zoom: 3.5
    });

    map.on("render", () => {
      if (!this.state.isReady) {
        this.setState({ isReady: true, map: map })
        map.flyTo({ center: [-78.4767, 38.0293], zoom: 10 });
      }
    })


    // map.on('load', function() {
    //
    //   map.addSource('railways', {
    //     type: 'geojson',
    //     data: 'https://dl.dropboxusercontent.com/s/my748ofmo9pu9tu/raill_usa.json?dl=0'
    //
    //   });
    //
    //   map.addLayer({
    //     "id": "railways",
    //     "type": "line",
    //     "source": "railways",
    //     "paint": {
    //         "line-color": "#ff69b4",
    //         "line-width": 1
    //     }
    //   });
    // })

  }

      // map.addLayer({
      //   'id': 'railways',
      //   'type': 'line',
      //   'source': 'railways',
      //   'source-layer': 'contour',
      //   'layout': {
      //       'visibility': 'visible',
      //       'line-join': 'round',
      //       'line-cap': 'round'
      //   },
      //   'paint': {
      //     'line-color': '#877b59',
      //     'line-width': 10
      //   }
      // });
    // });

  shouldComponentUpdate(nextProps, nextState) {
    return(
      nextProps.children != this.props.children ||
      nextState.map != this.state.map
    )
  }

  componentWillUnmount() {
    setTimeout(() => this.map.remove());
  }

  render(){
    const children = React.Children.map(this.props.children, child => (
      React.cloneElement(child, {
        map: this.state.map
      })
    ))
    return(
      <div className = 'Map' ref={ (x) => { this.container = x } }>
        {this.state.isReady && children}
      </div>
    );
  }
}

export default Map;
