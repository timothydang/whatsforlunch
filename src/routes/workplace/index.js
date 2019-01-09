import { h, Component, options } from 'preact';
import { connect } from "unistore/preact";
import actions from "../../store/actions";
import style from './style';

class Workplace extends Component {
	constructor() {
		super();

    this.state = {
      currentWorkplace: null,
      highlightedOption: null,
      workplaces: [],
    };
  }

  componentDidMount() {
    if (this.props.workplaces.length === 0) {
      const handleLocationChange = this.context.store.subscribe((updatedState) => {
        if (updatedState.workplaces !== this.state.workplaces) {
          this.setState({
            workplaces: updatedState.workplaces
          })
          this.checkAndLoadLunchOptions();
        } else {
          handleLocationChange();
        }
      });
    } else {
      this.setState({
        workplaces: this.props.workplaces
      })
      this.checkAndLoadLunchOptions();
    }

    this.context.store.subscribe(updatedState => {
      if (updatedState.isSuggesting) {
        this.getLunchOption();
      }
    });
	}

  getLunchOption = () => {
    const optionCount = this.props.currentOptions.length;  
    const getNumber = () => {
      return (getNumber.number = Math.floor(Math.random() * optionCount)) === getNumber.lastNumber ? getNumber() : getNumber.lastNumber = getNumber.number;
    }

    const animationInterval = setInterval(() => {
      let randomNumber = getNumber(optionCount);

      console.warn(randomNumber);
      this.setState({
        highlightedOption: randomNumber
      })

      // let choosenEl = document.querySelector('.choosen');
      // if (choosenEl) {
      //   choosenEl.classList.remove('choosen');
      // }

      // const card = document.querySelector(`[data-id="option-${randomNumber}"]`);
      // card.classList.add('choosen');;

      // setTimeout(() => {
      //   card.classList.remove('choosen');;
      // }, 200);
    }, 300);

    setTimeout(() => {
      clearInterval(animationInterval);

      // let choosenEl = document.querySelector('.choosen');
      // if (choosenEl) {
      //   choosenEl.classList.remove('choosen');
      // }

      // const card = document.querySelector(`[data-id="option-${this.props.suggested}"]`);
      // card.classList.add('choosen');;

      this.setState({
        highlightedOption: this.props.suggested
      });

      this.props.toggleSuggesting();
    }, 6100);
  }

  checkAndLoadLunchOptions(newState) {
    if (this.isValidWorkplace(this.props.location, this.state.workplaces)) {
      this.props.startLoading();
      this.props.loadLunchOptions(this.state.currentWorkplace.fields.name)
    } else {
      this.props.showFatalError();
    };
  }

  isValidWorkplace(location, workplaces) {
    const workplaceNames = workplaces.map((workplace) => workplace.fields.shortUrl);
    const workplaceIndex = workplaceNames.indexOf(location);
    if (workplaceIndex !== -1) {
      this.setState({
        currentWorkplace: workplaces[workplaceIndex]
      });
    }
    return workplaceIndex !== -1;
  }

  render(props, { highlightedOption, currentWorkplace }) {
		return (
			<div>
        {
          currentWorkplace ? <h2>{currentWorkplace.fields.name}</h2> : '' 
        }

        <div class="row">
        {
          props.currentOptions.map((option, index) => (
            <div class={`${style.card} ${highlightedOption === index ? style.choosen : ''}`} data-id={`option-${index}`}>
              <div class="section">
                <h3 class="doc">{option.fields.name}</h3>
                <ul>
                  {
                    option.fields.cuisine.map(cuisine => (
                      <li>{ cuisine }</li>
                    ))
                  }
                </ul>
              </div>
            </div>
          ))
        }
        </div>
			</div>
		);
	}
}

export default connect('isLoading, currentOptions, workplaces', actions)(Workplace);
