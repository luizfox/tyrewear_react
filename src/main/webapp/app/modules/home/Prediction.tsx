import React, { Component } from 'react';

export interface IPredictionProp extends DispatchProps {
  term: string;
}

export class Prediction extends React.Component<IPredictionProp> {

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
