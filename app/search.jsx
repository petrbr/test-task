import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from './autocomplete';
import Results from './results';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

class Search extends React.Component {
	constructor(props){
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.setAutocomplete = this.setAutocomplete.bind(this);
		this.handleAutocomplete = this.handleAutocomplete.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.state = {
			setAppFocused: this.props.setFocused,
			destFrom: '',
			destTo: '',
			destFromId: '',
			destToId: '',
			autocompleteQuery: '',
			autocompleteFor: '',
			dateFrom: moment().add(1, 'days'),
			destFromFocused: false,
			destToFocused: false
		};
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.inputDestFrom).focus();
		this.setState({
			destFromFocused: true
		});
	}

	handleAutocomplete(event) {
		switch(event.target.getAttribute('data-for')) {
			case 'destFrom':
				this.setState({
					destFrom: event.target.getAttribute('data-name'),
					destFromId: event.target.getAttribute('data-id'),
					autocompleteQuery: ''
				});
				ReactDOM.findDOMNode(this.refs.inputDestTo).focus();
				this.setState({
					destToFocused: true
				});
				break;
			case 'destTo':
				this.setState({
					destTo: event.target.getAttribute('data-name'),
					destToId: event.target.getAttribute('data-id'),
					autocompleteQuery: ''
				});
				break;
		};
	}

	setAutocomplete(event) {
		this.state.setAppFocused(true);
		switch(event.target.name) {
			case 'destFrom':
				this.setState({
					destFrom: event.target.value,
					destFromId: ''
				});
				break;
			case 'destTo':
				this.setState({
					destTo: event.target.value,
					destToId: ''
				});
				break;
		};

		this.setState({
			autocompleteQuery: event.target.value,
			autocompleteFor: event.target.name
		});
	}

	handleDateChange(date) {
		this.setState({
			dateFrom: date
		});
	}

	handleInputFocus(event) {
		event.target.select();
	}

	render() {

		const destFromClasses = classNames({
			'search__label': true,
			'search__label--dest-from': true,
			'search__label--focused': this.state.destFromFocused
		});

		const destToClasses = classNames({
			'search__label': true,
			'search__label--dest-to': true,
			'search__label--focused': this.state.destToFocused
		});

		return (
			<div>
				<div className="search">
					<div className="search__col">
						<label className={destFromClasses} htmlFor="dest-for-input">
							<input
								ref="inputDestFrom"
								value={this.state.destFrom}
								type="text"
								onChange={this.setAutocomplete}
								onFocus={this.handleInputFocus}
								name="destFrom"
								placeholder="From"
								id="dest-for-input"
							/>
						</label>
					</div>
					<div className="search__col">
						<label className={destToClasses} htmlFor="dest-to-input">
							<input
								ref="inputDestTo"
								value={this.state.destTo}
								type="text"
								onChange={this.setAutocomplete}
								onFocus={this.handleInputFocus}
								name="destTo"
								placeholder="To"
								id="dest-to-input"
							/>
						</label>
					</div>
					<div className="search__col">
						<label className="search__label search__label--date-from" htmlFor="date-picker">
							<DatePicker
								ref="inputDateFrom"
								selected={this.state.dateFrom}
								onChange={this.handleDateChange}
								id="date-picker"
							/>
						</label>
					</div>
				</div>
				<Autocomplete query={this.state.autocompleteQuery} for={this.state.autocompleteFor} handler={this.handleAutocomplete} />
				<Results destFromId={this.state.destFromId} destToId={this.state.destToId} dateFrom={this.state.dateFrom.format('DD/MM/YYYY')} />
			</div>
		);
	}
}

export default Search;