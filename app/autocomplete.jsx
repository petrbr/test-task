import React from 'react';

class Autocomplete extends React.Component {
	constructor(props){
		super();

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.setSelected = this.setSelected.bind(this);

		this.state = {
			data: [],
			selectedKey: 0
		};

		this.search(props.query);
	}

	componentWillReceiveProps(props) {
		if(props.query != '') {
			document.addEventListener('keydown', this.handleKeyPress);
			this.search(props.query);
		} else {
			document.removeEventListener('keydown', this.handleKeyPress);
			return null;
		}

	}

	handleKeyPress(event) {
		switch(event.keyCode) {
			case 40:
				// down
				event.preventDefault();
				if(this.state.selectedKey < (this.state.data.length - 1)) {
					this.setState({
						selectedKey: this.state.selectedKey + 1
					});
				} else {
					this.setState({
						selectedKey: 0
					});
				}
				break;
			case 38:
				// up
				event.preventDefault();
				if(this.state.selectedKey !== 0) {
					this.setState({
						selectedKey: this.state.selectedKey - 1
					});
				} else {
					this.setState({
						selectedKey: this.state.data.length - 1
					});
				}
				break;
			case 13:
				event.preventDefault();
				this.refs['row' + this.state.selectedKey].click();
				break;
		}
	}

	setSelected(event) {
		this.setState({
			selectedKey: event.target.getAttribute('data-key')
		});
	}

	search(query) {
		fetch('https://api.skypicker.com/places?term='+query+'&v=2&locale=en')
		.then(response => response.json())
		.then(json => {
			this.setState({
				data: json.slice(0, 10)
			});
		});
	}

	render() {
		if(this.props.query != '') {
			if(this.state.data.length !== 0) {
				let results = this.state.data.map((row, index) => {
					return (
						<div
						className = {index == this.state.selectedKey ? 'autocomplete__row autocomplete__row--selected' : 'autocomplete__row'}
						key = {index}
						onClick = {this.props.handler}
						onMouseEnter = {this.setSelected}
						data-id = {row.id}
						data-key = {index}
						data-for = {this.props.for}
						data-name = {row.value}
						ref = {'row'+index}>
							{row.value}
						</div>
					)
				});

				return (
					<div className="autocomplete">
						{results}
					</div>
				)
			} else {
				return (
					<div className="autocomplete autocomplete--error">
						<p>Unfortunately, we did not find any destinations :-(</p>
					</div>
				)
			}
		} else {
			return null;
		}
	}
}

export default Autocomplete;