import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';
import './nprogress.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedAllLocations: 'all',
    numberOfEvents: 32,
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
        })
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents: numberOfEvents
    })
  }

  updateEvents = (location, inputNumber) => {
    const { selectedAllLocations } = this.state
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const eventsDisplayed = locationEvents.slice(0, this.state.inputNumber);
        this.setState({
          events: eventsDisplayed,
          numberOfEvents: inputNumber,
          selectedAllLocations: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedAllLocations === 'all') ?
          events :
          events.filter((event) => event.location === selectedAllLocations);
        const eventsDisplayed = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsDisplayed,
          numberOfEvents: inputNumber
        });
      });
    }
  }
  render() {
    const offlineText = navigator.onLine ? '' : 'this app is not online. the events may not be up to date';

    return (
      <div className="App">
        <WarningAlert text={offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />

        <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" allowDecimals={false} name="number of events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>

        <EventList events={this.state.events} />
      </div>
    );
  };
};
export default App;
