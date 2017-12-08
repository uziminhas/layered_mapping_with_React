import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';

class QuakeFeature extends Component {

  componentWillMount() {
    const {
      map,
      id,
      type,
      data,
      layerType,
      paint,
      sliderValue,
      isLayerChecked,
      before
    } = this.props;

    const opacity = `${layerType}-opacity`;
    {/*Template literals are string literals allowing embedded expressions.*/}

    map.addSource(id, {
      type: type,
      data: data
    })
    var mags = [0,1,2,3,4,5,6,7,8,9,10];
    for (var i = 0; i < mags.length; i++) {
      var mag = mags[i];
      map.addLayer({
        "id": id+mag,
        "type": layerType,
        "source": id,
        "filter": ["all", [">=", "mag", mag], ["<", "mag", mag+1]],
        "paint": merge({
          "circle-radius": Math.pow(mag,2)/1.5,
          "circle-color": "#ff0000",
        }, {
          [opacity]: sliderValue
        })
      }, before);
    }


    if(!isLayerChecked){
      for (var i = 0; i < 10; i++) {
        map.setLayoutProperty(id+i, 'visibility', 'none');
      }
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
      for (var i = 0; i < 10; i++) {
        map.setPaintProperty(id+i, `${layerType}-opacity`, nextProps.sliderValue)
      }
    }
    if (nextProps.isLayerChecked !== isLayerChecked) {
      const visibility = (nextProps.isLayerChecked) ? 'visible' : 'none';
      for (var i = 0; i < 10; i++) {
        map.setLayoutProperty(id+i, 'visibility', visibility)
      }
    }

    return null;
  }

  componentWillUnmount() {
    const {
      id,
      map
    } = this.props;

    for (var i = 0; i < 10; i++) {
      map.removeSource(id+i);
      map.removeLayer(id+i);
    }


  }

  render() {
    //do nothing
    return null;
  }
}

export default QuakeFeature;
