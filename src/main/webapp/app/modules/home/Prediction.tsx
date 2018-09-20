import React, { Component } from 'react';

export class Prediction extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
        <p> Prediction: {this.props.term}%</p>
    );
  }
}

export default Prediction;
