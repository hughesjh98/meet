import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents"

describe('<NumberOfEvents/> component', () => {
    let numOfEventsWrapper;
    beforeAll(() => {
        numOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>)
    });

    test('render the number of events',() => {
        expect(numOfEventsWrapper.find('.numOfEvents')).toHaveLength(1);
    })

    test('renders the default number to 32', () => {
        expect(numOfEventsWrapper.find('.input-number').prop('type')).toBe('number');
        expect(numOfEventsWrapper.state('number')).toBe('32');
    })

    test('check if the value is set to 32', () => {
        const number = numOfEventsWrapper.state('number');
        expect(numOfEventsWrapper.find('.input-number').prop('value')).toBe(number)
    })

    test('change state when number input changes', () => {
        numOfEventsWrapper.setState({ number:'32' });
        const eventNumber = { target: { value: '20' } };
        numOfEventsWrapper.find('.input-number').simulate('change', eventNumber);
        expect(numOfEventsWrapper.state('number')).toBe('20');
    })
})
