import * as React from "react";
import {EventBookingForm} from "./event_booking_form";
import {Event} from "../model/event";

export interface EventBookingFormContainerProps {
    eventID: string;
    eventServiceURL: string;
    bookingServiceURL: string;
}

export interface EventBookingFormState {
    loading: boolean;
    event?: Event;
}

export class EventBookingFormContainer extends React.Component<EventBookingFormContainerProps, EventBookingFormState> {
    constructor(p: EventBookingFormContainerProps) {
        super(p);

        this.state = {
            loading: true
        };

        fetch(p.eventServiceURL + "/events/" + p.eventID)
            .then<Event>(resp => resp.json())
            .then(event => {
                this.setState({
                    loading: false,
                    event: event
                });
            })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (!this.state.event) {
            return <div>Unknown error</div>;
        }

        return <EventBookingForm event={this.state.event} onSubmit={amount => this.handleSubmit(amount)}/>
    }

    private handleSubmit(amount: number) {

    }
}