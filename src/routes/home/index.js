import { h, Component } from 'preact';
import style from './style';

import { connect } from "unistore/preact";
import actions from "../../store/actions";

class Home extends Component {
	render(props, {}) {
		return (
			<div class={style.home}>
        {
          console.warn(props)
        }
        {
          props.workplaces.map(workplace => (
            <a href={`/workplace/${workplace.fields.shortUrl}`}>{workplace.fields.name}</a>
          ))
        }

			</div>
		);
	}
}

export default connect('isLoading, workplaces', actions)(Home);
