import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents"

describe('<NumberOfEvents/> component', () => {
    let numOfEventsWrapper;
    beforeAll(() => {
        numOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />)
    });

    test('render the number of events', () => {
        expect(numOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });

    test("render text input correctly", () => {
        const numberOfEvents = numOfEventsWrapper.state("numberOfEvents");
        expect(numOfEventsWrapper.find(".input-number").prop("value")).toBe(numberOfEvents);
    });

    test('change state when number input changes', () => {
        const eventNumber = { target: { value: 32 } };
        numOfEventsWrapper.find('.input-number').simulate("change", eventNumber);
        expect(numOfEventsWrapper.state("numberOfEvents")).toBe(32);
    })

    test('events displayed has a label', () => {
        expect(numOfEventsWrapper.find(".numberOfEvents label")).toHaveLength(1)
    })


})
