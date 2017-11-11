import React from 'react';
import Search from './search';
import classNames from 'classnames';

class App extends React.Component {
	constructor() {
		super();

		this.setFocused = this.setFocused.bind(this);

		this.state = {
			appActive: false
		};
	}

	setFocused(bool) {
		this.setState({
			appActive: bool
		});
	}

	render() {

		const headerClasses = classNames({
			'header__h1': true,
			'header__h1--hidden': this.state.appActive
		});

		const mainClasses = classNames({
			main: true,
			'main--focused': this.state.appActive
		});

		return (
			<div>
				<div className="header">
					<h1 className={headerClasses}>Find a ticket!</h1>
				</div>
				<div className={mainClasses}>
					<Search setFocused={this.setFocused} />
				</div>
			</div>
		);
	}
}
export default App;