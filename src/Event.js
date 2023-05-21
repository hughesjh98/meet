import moment from "moment";
import React, { Component } from "react";


class Event extends Component {
    state = {
        collapsed: true
    };

    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed
        }))
    }


    render() {
        const { event } = this.props;
        const { collapsed } = this.state;
        
        return (
            <div className="event">
                <h3 className="summary">{event.summary}</h3>
                <p className="start_event">{moment(event.start.dateTime).format('MMMM Do YYYY, h:mma ')}</p>
                <p className="location">{event.location}</p>

                {!collapsed && (
                    <>
                        <div className="event-details">
                            <a className="link" href={event.htmlLink}> see details on google calendar</a>
                            <p className="description">{event.description}</p>
                        </div>
                    </>
                )}


                <button className="details-btn" onClick={() => this.toggleDetails()}>{collapsed ? "Show" : "Hide"} Details</button>
            </div>
        )
    }
}
export default Event;