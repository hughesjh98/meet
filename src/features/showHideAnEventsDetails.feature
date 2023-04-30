Feature: Show and hide an events details

Scenario: an event is collapsed as default
Given the user has just opened the app
When all of the events are listed
Then all of the details are not displayed yet

Scenario: users can expand an event to see its details
Given the user wanted to know more about the event
When the user clicks on the details button on the event
Then the details of that event are shown

Scenario:  users can collapse an event to hide its details
Given the user has looked at the details of an event 
When the user clicks hide details on the event
Then the details will collapse into its default state
