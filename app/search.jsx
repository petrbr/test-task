import React from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from './autocomplete';
import Results from './results';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class Search extends React.Component {
	constructor(){
		super();
		this.setAutocomplete = this.setAutocomplete.bind(this);
		this.handleAutocomplete = this.handleAutocomplete.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.state = {
			destFrom: '',
			destTo: '',
			destFromId: '',
			destToId: '',
			autocompleteQuery: '',
			autocompleteFor: '',
			dateFrom: moment().add(1, 'days')
		};
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.inputFrom).focus();
	}

	handleAutocomplete(event) {
		switch(event.target.getAttribute('data-for')) {
			case 'destFrom':
				this.setState({
					destFrom: event.target.getAttribute('data-name'),
					destFromId: event.target.getAttribute('data-id'),
					autocompleteQuery: ''
				});
				ReactDOM.findDOMNode(this.refs.inputTo).focus();
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
		return (
			<div>
				<div className="search">
					<div className="search__input search__input--dest-from">
						<input
							ref="inputFrom"
							value={this.state.destFrom}
							type="text"
							onChange={this.setAutocomplete}
							onFocus={this.handleInputFocus}
							name="destFrom"
							placeholder="From"
						/>
					</div>
					<div className="search__input search__input--dest-to">
						<input
							ref="inputTo"
							value={this.state.destTo}
							type="text"
							onChange={this.setAutocomplete}
							onFocus={this.handleInputFocus}
							name="destTo"
							placeholder="To"
						/>
					</div>
					<div className="search__input search__input--date-from">
						<DatePicker
							ref="inputDateFrom"
							selected={this.state.dateFrom}
							onChange={this.handleDateChange}
							id='date-picker'
						/>
					</div>
				</div>
				<Autocomplete query={this.state.autocompleteQuery} for={this.state.autocompleteFor} handler={this.handleAutocomplete} />
				<Results destFromId={this.state.destFromId} destToId={this.state.destToId} dateFrom={this.state.dateFrom.format('DD/MM/YYYY')} />
			</div>
		);
	}
}

export default Search;