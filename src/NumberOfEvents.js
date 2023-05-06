import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

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
        return (
            <div className="numberOfEvents">
                <label>events displayed</label>
                <input
                    type="text"
                    className="input-number"
                    min={1}
                    max={32}
                    value={this.state.numberOfEvents}
                    onChange={this.handleNumberChange}
                />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}
export default NumberOfEvents