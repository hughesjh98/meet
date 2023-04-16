import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    };

    handleNumberChange = (event) => {
        const inputValue = event.target.value;
        this.props.updateEvents(null, inputValue);
        this.setState({ numberOfEvents: inputValue });

        if (inputValue < 1) {
            this.setState({
                infoText: "select a number from 1 to 32"
            });
        } else {
            this.setState({
                infoText: "",
            });
        }
    }

    render() {
        const { numberOfEvents } = this.state;
        return (
            <div className="numberOfEvents">
                <label>events displayed</label>
                <input
                    type="text"
                    className="input-number"
                    value={numberOfEvents}
                    onChange={this.handleNumberChange}
                />
            </div>
        );
    }
}
export default NumberOfEvents