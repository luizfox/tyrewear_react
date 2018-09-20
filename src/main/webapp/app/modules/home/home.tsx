import './home.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import Prediction from 'app/modules/home/Prediction';

export interface IHomeProp extends StateProps, DispatchProps {}

export interface IHomeState{
	tyrewear: string;
}


export class Home extends React.Component<IHomeProp, IHomeState> {
	state: IHomeState = {
		tyrewear: ''
	};

  componentDidMount() {
    this.props.getSession();
  }

	handleSubmit = (event, errors, { atemp, ttemp, time }) => {
		let url = 'http://localhost:8000/predict?atemp=' + atemp + '&ttemp=' + ttemp + '&time=' + time
		axios.get(url)
		.then((response) => {
			let res = response.data[0];
			this.setState({tyrewear: res});
  })
  .catch(function (error) {
    console.error(error);
  });

	};

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9">
          <h2>Hi!</h2>
          <p className="lead">My name is Luiz Gomes, and here you can check out
						a small portfolio of an application I'm used to writing. I'm showing
						 some Data Science and JavaScript skills. </p>

						 Technically, I'm using R to create a linear regression (a technique
						 where you predict a number), exposing it with a web service, and
						 then using a ReactJS application to use this web service.

						 In addition to technology, I enjoy motorsport and motorsport
						 simulation on PC. A key factor in motorsport is tyre saving.
						 The problem I'm solving here is to predict how much a tyre will
						 be worn out, giving the temperature of the track, the temperature
						  of the ambient and how much time racing, given a specific track
							(Spa Francorchamps, in this case), a specific car (Porsche 919,
								in this case. A three-times LeMans 24h champion) and no other
							car setup changes. You can see on the plot besides that the when the
							track is colder the tyre's wear is a way lesser.

							This is useful to plan your race strategy.
					<p>

					</p>
            <div>
						<AvForm onSubmit={this.handleSubmit}>
							<Row>
	              <Col md="4">
	                <AvField
	                  name="atemp"
	                  label="Ambient temperature"
	                  placeholder="Ambient temperature"
	                  autoFocus
	                />
	              </Col>
								<Col md="4">
									<AvField
										name="ttemp"
										label="Track temperature"
										placeholder="Track temperature"
									/>
								</Col>
								<Col md="4">
									<AvField
										name="time"
										label="Current time (in seconds)"
										placeholder="Current time (in seconds)"
									/>
								</Col>
							</Row>
							<Row>
								<Col md="3">
									<Button color="primary" type="submit">
			              Predict the tyre's wear!
			            </Button>
								</Col>
								<Col md="3">
									<p></p>
									<p><Prediction term={this.state.tyrewear}/></p>
								</Col>
	            </Row>
						</AvForm>
            </div>
          <p>
            If you have any question/comments about this project, please reach me out on {' '}
            <a href="https://github.com/luizfox" target="_blank" rel="noopener noreferrer">
               Github
            </a>!
          </p>
        </Col>
        <Col md="3" className="pad">
					<Row>
          	<span className="plot" />
					</Row>
					<Row>
          	<span className="porsche" />
					</Row>
					{/* <img src="../../../static/images/logo-jhipster-react.svg" /> */}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
