import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mockData';



const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = mount(<App/>)
    });

    test('an event is collapsed as default', ({ given, when, then }) => {
        given('the user has just opened the app', () => {
        });

        when('all of the events are listed', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
        });

        then('all of the details are not displayed yet', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });

    test('users can expand an event to see its details', ({ given, when, then }) => {
        given('the user wanted to know more about the event', () => {
        });
       
        when('the user clicks on the details button on the event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .detailsBtn').at(0).simulate('click')
        });

        then('the details of that event are shown', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
        });
    });

    test('users can collapse an event to hide its details', ({ given, when, then }) => {
        given('the user has looked at the details of an event', () => {
        });

        when('the user clicks hide details on the event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .detailsBtn').at(0).simulate('click');
        });

        then('the details will collapse into its default state', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });
    

});