Feature: Specify the number of events

Scenario:User hasnt specified a number 32 is the default number
Given the user has just opened the app
When the user hasnt specified the amount of events
Then the default amount of events shown are 32

Scenario:users can change the number of events they want to see
Given the user wants to see more or less events on home screen
When a user changes the amount of events shown
Then the amount of events will be added or subtracted to the chosen amount of events

