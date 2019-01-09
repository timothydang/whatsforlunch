import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Workplace from '../routes/workplace';

import { connect } from "unistore/preact";
import actions from "../store/actions";

class App extends Component {
  loadLocations = () => {
    // this.props.setup();
    this.props.loadLocations();
  };

  handleRoute = (e) => {
  };

  componentDidMount() {
    this.loadLocations();
  };

  render(props, {}) {
    return (
			<div id="app">
        <div class={`page-loader ${!props.isLoading ? 'hidden': ''} `}>
          <div class="spinner"></div>
        </div>
        <div>
          <Header />
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Workplace path="/workplace/:location"/>
          </Router>
        </div>
			</div>
		);
	}
}

export default connect('isLoading, workplaces', actions)(App);
