import mongoose from "mongoose";
const eventsSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      //required: true,
    },
    
  },

  { timestamps: true }
);
const Events=mongoose.model("Events",eventsSchema);
export default Events;