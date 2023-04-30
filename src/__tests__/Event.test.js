import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mockData";
import Event from "../Event";

describe('<Event /> component', () => {
    let EventWrapper;
    const event = mockData[0];
    EventWrapper = shallow(<Event event={event}/>);

    test('check if the event details has been rendered', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
        expect(EventWrapper.find('.start_event')).toHaveLength(1);
    })

    test('check if the title of the event has been rendered', () => {
        const summary = EventWrapper.find('h3.summary');
        expect(summary).toHaveLength(1);
        expect(summary.text()).toBe(event.summary);
    })

    test('check if the start event has been rendered', () => {
        const eventStart = EventWrapper.find('p.start_event')
        expect(eventStart).toHaveLength(1);
        expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
    })

    test('check if the location has been rendered', () => {
        const eventLocation = EventWrapper.find('p.location');
        expect(eventLocation.find('.location')).toHaveLength(1);
        expect(eventLocation.text()).toBe(event.location) 
    })

    test('check if the button is collasped by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    })

    test('check if link details havent\'t been rendered',() => {
        expect(EventWrapper.find('a.link')).toHaveLength(0);
        expect(EventWrapper.find('p.description')).toHaveLength(0);
    })

    test('check if the button can expand when clicked', () => {
        const detailsButton = EventWrapper.find('button.detailsBtn');
        expect(detailsButton.text()).toBe('Show Details');
        detailsButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    })

    test('check if link details have been rendered',() => {
        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('p.description')).toHaveLength(1);
    })

    test('check if the button can close when clicked', () => {
        const detailsButton = EventWrapper.find('button.detailsBtn');
        expect(detailsButton.text()).toBe('Hide Details');
        detailsButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    })
});