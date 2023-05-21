import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { WarningAlert } from './Alert';
import EventGenre from './EventGenre';
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
        const shownEvents = events.slice(0, this.state.numberOfEvents)
        this.setState({
          events: shownEvents,
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

  updateEvents = (location, numberOfEvents) => {
    if (!numberOfEvents) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.numberOfEvents);
        this.setState({
          events: shownEvents,
          selectedAllLocations: location,
        });
      });
    } else if (numberOfEvents && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: shownEvents,
          numberOfEvents: numberOfEvents,
        });
      });
    } else if (this.state.selectedAllLocations === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: shownEvents,
         numberOfEvents: numberOfEvents,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          this.state.locations === "all"
            ? events
            : events.filter(
                (event) => this.state.selectedAllLocations === event.location
              );
        const shownEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: shownEvents,
          numberOfEvents:numberOfEvents,
        });
      });
    }
  };

  render() {
    const offlineText = navigator.onLine ? '' : 'this app is not online. the events may not be up to date';
    const { locations, numberOfEvents, events } = this.state;

    return (
      <div className="App">
        <WarningAlert text={offlineText} />
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} updateEvents={this.updateEvents} />

        <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>
          <EventGenre events={events} />
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
        </div>
        <EventList events={events} />
      </div>
    );
  };
};
export default App;
