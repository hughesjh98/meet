import { loadFeature, defineFeature } from "jest-cucumber"
import React from "react";
import { mockData } from "../mockData";
import { mount} from 'enzyme';
import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = mount(<App />);
    })

    test('User hasnt specified a number 32 is the default number', ({ given, when, then }) => {
        given('the user has just opened the app', () => {

        });

        when('the user hasnt specified the amount of events', () => {
        });

        then('the default amount of events shown are 32', () => {
            expect(AppWrapper.state('numberOfEvents')).toBe(32);
        });
    });


    test('users can change the number of events they want to see', ({ given, when, then }) => {
        given('the user wants to see more or less events on home screen', async () => {
            AppWrapper = await mount(<App/>)
        });

        when('a user changes the amount of events shown', () => {
            AppWrapper.update();
            let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
            const eventObject = { target: { value: 2 }};
            NumberOfEventsWrapper.find('.input-number').simulate('change',eventObject);
        });

        then('the amount of events will be added or subtracted to the chosen amount of events', () => {
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

});