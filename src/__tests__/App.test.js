import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import numberOfEvents from "../NumberOfEvents"
import { mockData } from '../mockData';
import { extractLocations, getEvents } from '../api';
import NumberOfEvents from "../NumberOfEvents";
//unit tests
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />)
    })
    //
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    //test if the city search has been rendered
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })

    test('render numberOfEvents', () => {
        expect(AppWrapper.find(numberOfEvents)).toHaveLength(1);
    })
});
// intergration tests
describe('<App/> intergration', () => {
    test('App passes "events"state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    })

    test('get a list of events that matches the city selected by th user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);

        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];

        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get a list of all events when the user clicks"see all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    //intergration tests for NumberOfEvents
    test('App passes numberOfEvents state as a prop to NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        const AppEventCountState = AppWrapper.state('numberOfEvents');
        expect(AppEventCountState).not.toEqual(undefined);
        AppWrapper.setState({ numberOfEvents: 32 });
        expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppEventCountState);
        AppWrapper.unmount();
    })

    test('filtered list of events that matches the mock data', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', { target: { value: 3 } });
        await getEvents();
        expect(AppWrapper.state('events')).toEqual(mockData.slice(0, 3));
        AppWrapper.unmount();
    })
})