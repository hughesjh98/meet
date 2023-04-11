import React, { Component } from "react";


class NumberOfEvents extends Component {
    state = {
        number: '32'
    }

    handleNumberChange = (event) => {
        let inputValue = event.target.value;
        const errorMessage = 'please enter a number from 1 to 32';

        if (inputValue < 1 || inputValue > 32) {
            this.setState({ errorMessage });
            this.props.updateEvents(null, [])
        } else {
            this.setState({ number: inputValue });
            this.props.updateEvents(null, inputValue)
        }
    }


    render() {
        return (
            <div className="numOfEvents">
                <h4>events displayed</h4>
                <input
                    type="number"
                    className="input-number"
                    value={this.state.number}
                    onChange={this.handleNumberChange}


                />

            </div>
        )
    }
}
export default NumberOfEvents