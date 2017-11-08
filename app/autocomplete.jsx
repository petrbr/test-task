import React from 'react';

class Autocomplete extends React.Component {
	constructor(props){
		super();

		this.state = {
			data: []
		};

		this.search(props.query);
	}

	componentWillReceiveProps(props) {
		this.search(props.query);
	}

	search(query) {
		if(query != '') {
			fetch('https://api.skypicker.com/places?term='+query+'&v=2&locale=en')
			.then(response => response.json())
			.then(json => {
				this.setState({data: json});
			});
		}
	}

	render() {
		if(this.props.query != '') {
			if(this.state.data.length !== 0) {
				let results = this.state.data.slice(0, 10).map((row, index) => {
					return (
						<div
						className="autocomplete__row"
						key={index}
						onClick={this.props.handler}
						data-id={row.id}
						data-for={this.props.for}
						data-name={row.value}>
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