import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User', // You'll need to create a User model for organizers
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // You'll need to create a User model for attendees
    },
  ],
});

const Event = model('Event', eventSchema);

export default Event;
