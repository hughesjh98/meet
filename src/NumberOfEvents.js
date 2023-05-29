import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
import './NumberOfEvents.css';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
    };

    handleNumberChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue >= 1 || inputValue <= 32) {
            this.setState({
                numberOfEvents: inputValue,
                errorText: ''
            });
            this.props.updateEvents(null, inputValue);
        }

        if (inputValue < 1 || inputValue > 32) {
            this.setState({
                numberOfEvents: inputValue,
                errorText: "please select a number from 1 to 32"
            });
        }
    }

    render() {
        const { numberOfEvents, errorText } = this.state;
        return (
            <div className="numberOfEvents">
                <label>events displayed</label>
                <input
                    type="number"
                    className="input-number"
                    min={1}
                    max={32}
                    value={numberOfEvents}
                    onChange={this.handleNumberChange}
                />
                <ErrorAlert text={errorText} />
            </div>
        );
    }
}
export default NumberOfEvents