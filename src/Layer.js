import React, { Component } from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash.merge';

class Layer extends Component {

  static propTypes = {
    map: PropTypes.object,
    id: PropTypes.string,
    type: PropTypes.string,
    sourceLayer: PropTypes.string,
    sourceId: PropTypes.string,
    paint: PropTypes.object,
    layout: PropTypes.object,
    before: PropTypes.string
  }

  componentWillMount() {
    const {
      map,
      id,
      type,
      sourceLayer,
      sourceId,
      paint = {},
      layout = {},
      before,
      sliderValue,
      isLayerChecked
    } = this.props; {/* destructuring assignment allows properties to be unpacked from objects */}

    const layerId = `${sourceId}-${id}`;
    const opacity = `${type}-opacity`;
    {/*Template literals are string literals allowing embedded expressions.*/}

    map.addLayer({
      id: layerId,
      source: sourceId,
      'source-layer': sourceLayer,
      type,
      layout,
      paint: merge(paint, {
        [opacity]: sliderValue
      })
    }, before)

    if(!isLayerChecked) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    }
  }

  /* EXAMPLE API: map.setPaintProperty('my-layer', 'fill-color', '#faafee') */
  /* EXAMPLE API: map.setLayoutProperty('my-layer', 'visibility', 'none') */

  /* Use this as an opportunity to react to a prop transition before render()
  is called by updating the state using this.setState().
  The old props can be accessed via this.props. */

  componentWillReceiveProps(nextProps, map) {
    const { id, type, sourceId, sliderValue, isLayerChecked } = this.props;
    const layerId = `${sourceId}-${id}`;

    if (nextProps.sliderValue && nextProps.sliderValue !== sliderValue) {
      map.setPaintProperty(layerId, `${type}-opacity`, nextProps.sliderValue);
    }
    if (nextProps.isLayerChecked !== isLayerChecked) {
      const visibility = (nextProps.isLayerChecked) ? 'visibile' : 'none';
      map.setLayoutProperty(layerId, 'visibility', visibility);
    }
    return null;
  }

  render() {
    return null
  }
}

export default Layer;
