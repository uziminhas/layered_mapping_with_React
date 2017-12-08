import React, { Component } from 'react';

class Basemap extends Component {

  componentWillReceiveProps(nextProps) {
    const { map, isLayerChecked } = this.props;
    const color = (map.getPaintProperty('water', 'fill-color') === '#90CAF9') ? '#cad2d3' : '#90CAF9';

    if (nextProps.isLayerChecked !== isLayerChecked) {
      map.setPaintProperty('water', 'fill-color', color);
    }

    return null;

  }

  render() {
    return null;
  }

}

export default Basemap;
