import { h, Component } from 'preact';
// import { Link } from 'preact-router/match';
import { connect } from "unistore/preact";
import actions from "../../store/actions";

class Header extends Component {
  onClickDecide = () => {
    if (this.props.isSuggesting) return;

    this.props.toggleSuggesting();
    this.props.getSuggestion();
  }

  render(props, {}) {
		return (
      <header>
        <div class="row">
          <div class="col-sm-2">
            <a href="#" class="logo">Logo</a>
          </div>

          <div class="col-sm-2 col-sm-offset-4">
            <a class="button primary" href="#" onClick={ this.onClickDecide }>Decide for me</a>
          </div>
        </div>
      </header>
		);
	}
}

export default connect('currentOptions, isSuggesting, suggested', actions)(Header);
