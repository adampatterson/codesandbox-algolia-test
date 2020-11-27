import React, { Component, Fragment } from 'react';

import { connectRange } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import Rheostat from 'rheostat';
import numeral from 'numeral';

class RheostatRangeSlider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentRefinement: PropTypes.object,
    refine: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    unit: PropTypes.string,
  };

  state = {
    currentValues: {
      min: this.props.min,
      max: this.props.max,
    },
  };

  componentWillReceiveProps = (sliderState) => {
    if (sliderState.canRefine) {
      const { min, max } = sliderState.currentRefinement;
      this.setState({
        currentValues: {
          min: min,
          max: max,
          unit: '',
        },
      });
    }
  };

  onValuesUpdated = (sliderState) => {
    const { min, max } = this.props;
    this.setState({
      currentValues: {
        min: Math.min(Math.max(sliderState.values[0], min), max),
        max: Math.max(Math.min(sliderState.values[1], max), min),
      },
    });
  };

  onChange = (sliderState) => {
    const { min, max } = this.props;
    if (
      this.props.currentRefinement.min !== sliderState.values[0] ||
      this.props.currentRefinement.max !== sliderState.values[1]
    ) {
      let computedMin = Math.min(Math.max(sliderState.values[0], min), max);
      let computedMax = Math.max(Math.min(sliderState.values[1], max), min);
      if (computedMin === computedMax && computedMin > min) {
        computedMin -= 1;
      } else if (computedMin === computedMax && computedMax < max) {
        computedMax += 1;
      }

      this.props.refine({
        min: computedMin,
        max: computedMax,
      });
    }
  };

  formatValue = (value, unit) => {
    if (typeof unit !== 'undefined') {
      if (unit.startsWith('_')) {
        return (
          <Fragment>
            {numeral(value).format('0,0')}
            <span>{unit.replace('_', '')}</span>
          </Fragment>
        );
      }
      return (
        <Fragment>
          <span>{unit.replace('_', '')}</span>
          {numeral(value).format('0,0')}
        </Fragment>
      );
    }
  };

  render = () => {
    const { min, max, currentRefinement, unit } = this.props;
    const { currentValues } = this.state;
    return min !== max ? (
      <div className="uni-Slider">
        <div className="uni-Slider-bar">
          <Rheostat
            className="uni-Rheostat"
            min={min}
            max={max}
            snap={true}
            values={[currentRefinement.min, currentRefinement.max]}
            onChange={this.onChange}
            onValuesUpdated={this.onValuesUpdated}
          />
          <div className="uni-Slider-values">
            <div className="uni-Slider-value uni-Slider-value--min">
              {this.formatValue(currentRefinement.min, unit)}
            </div>
            <div className="uni-Slider-value uni-Slider-value--max">
              {this.formatValue(currentRefinement.max, unit)}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="ais-RheostatRangeSlider-item">No range to display.</div>
    );
  };
}

export default connectRange(RheostatRangeSlider);
