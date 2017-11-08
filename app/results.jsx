import React from 'react';
import moment from 'moment';

class Results extends React.Component {
	constructor(props){
		super();

		this.state = {
			results: []
		};

	}

	componentWillReceiveProps(props) {
		this.setState({results: []});
		if(props.destFromId !== '' && props.destToId !== '' && props.dateFrom !== '') {
			this.search(props.destFromId, props.destToId, props.dateFrom);
		}
	}

	search(destFromId, destToId, dateFrom) {
		fetch('https://api.skypicker.com/flights?v=2&locale=en&flyFrom='+destFromId+'&to='+destToId+'&dateFrom='+dateFrom+'&dateTo='+dateFrom+'&typeFlight=single')
		.then(response => response.json())
		.then(json => {
			this.setState({results: json});
		});
	}

	render() {
		if(this.props.destFromId !== '' && this.props.destToId !== '' && this.props.dateFrom !== '' && typeof this.state.results.data !== "undefined") {
			if(this.state.results.data.length !== 0) {
				let results = this.state.results.data.slice(0, 10).map((row, index) => {
					return (
						<div
						className="results__row"
						key={index}>
							<div className="results__info">
								<span className="results__price">
									<strong>&euro;{row.price}</strong>
									<span className="results__duration">{row.fly_duration}</span>
								</span>
								<span className="results__route">
									<strong>{row.flyFrom}</strong> <span className="separator">to</span> <strong>{row.flyTo}</strong>
									{row.route.length > 1 &&
										<span className="results__stopovers">Stopovers: {row.route.length - 1}</span>
									}
								</span>
								<div className="results__flights">
									{row.route.map((flight, i) => {
											return (
												<span
													key={i}
													className="results__flight">
													{flight.cityFrom} - {flight.cityTo}
												</span>
											)
										})
									}
								</div>
								<span className="results__date">
									{moment.unix(row.dTimeUTC).format('MM/DD/YYYY')}
									<small>{moment.unix(row.dTimeUTC).format('h:mm a')} - {moment.unix(row.aTimeUTC).format('h:mm a')}</small>
								</span>
								<span className="results__book">
									<button></button>
								</span>
							</div>
						</div>
					)
				});

				return (
					<div className="results">
						{results}
					</div>
				);
			} else {
				return (
					<div className="results results--error">
						<p>Unfortunately, we did not find any flight :-(</p>
					</div>
				)
			}

		} else if(this.props.destFromId !== '' && this.props.destToId !== '' && this.props.dateFrom !== '' && typeof this.state.results.data === "undefined") {
			return (
				<div className="results results--loading">
					<span className="spinner">&nbsp;</span>
				</div>
			)
		} else {
			return null;
		}
	}
}

export default Results;