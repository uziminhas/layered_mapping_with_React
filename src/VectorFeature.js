import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';

class VectorFeature extends Component {

  componentWillMount() {
    const {
      map,
      id,
      type,
      data,
      layerType,
      sourceLayer,
      paint,
      sliderValue,
      isLayerChecked,
      before
    } = this.props;

    const opacity = `${layerType}-opacity`;
    {/*Template literals are string literals allowing embedded expressions.*/}

    map.addSource(id, {
      type: type,
      url: data
    })
    map.addLayer({
      "id": id,
      "type": layerType,
      "source": id,
      "source-layer": sourceLayer,
      "paint": merge(paint, {
        [opacity]: sliderValue
      })
    }, before);

    if(!isLayerChecked){
      map.setLayoutProperty(id, 'visibility', 'none');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      map,
      id,
      layerType,
      sliderValue,
      isLayerChecked
    } = this.props;

    if (nextProps.sliderValue && nextProps.sliderValue !== sliderValue) {
      map.setPaintProperty(id, `${layerType}-opacity`, nextProps.sliderValue)
    }
    if (nextProps.isLayerChecked !== isLayerChecked) {
      const visibility = (nextProps.isLayerChecked) ? 'visible' : 'none';
      map.setLayoutProperty(id, 'visibility', visibility)
    }

    return null;
  }

  componentWillUnmount() {
    const {
      id,
      map
    } = this.props;

    map.removeSource(id);
    map.removeLayer(id);
  }

  render() {
    //do nothing
    return null;
  }
}

export default VectorFeature;
