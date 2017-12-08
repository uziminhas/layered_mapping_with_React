import React, { Component } from 'react';
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js';
import MapboxCSS from 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';


class Source extends Component {

  static propTypes = {
    map: PropTypes.object,
    id: PropTypes.string,
    data: PropTypes.string,
    layer: PropTypes.string,
    children: PropTypes.node,
  }

  componentWillMount() {
    const {
      id,
      data,
    } = this.props; {/* destructuring assignment allows properties to be unpacked from objects */}

    const map = this.props.map;

    map.addSource(id, {
      type: 'geojson',
      data: data
    })
  }

/*this.props.children is used to display whatever you include
between the opening and closing tags when invoking a component*/

  render() {
    return (
      <div>
        {this.props.children &&
          React.Children.map(this.props.children, child => (
            React.cloneElement(child, {
              sourceId: this.props.id,
              sourceLayer: this.props.layer
            })
          ))
        }
      </div>
    )
  }

}

export default Source;
