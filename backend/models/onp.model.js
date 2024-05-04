// import mongoose from "mongoose";

// // Define schema for OnPickup model
// const onPickupSchema = new mongoose.Schema({
//   first_name: {
//     type: String,
//     required: true,
//   },
//   last_name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone_number: {
//     type: Number, // Assuming phone number can contain characters such as '+', '-', etc.
//     required: true,
//   },
//   nic: {
//     type: String,
//     // validate: {
//     //   validator: function(v) {
//     //     return /^[0-9]{9}[Vv]$/.test(v);
//     //   },
//     //   message: props => `${props.value} is not a valid NIC number! Must be 9 digits followed by 'V' or 'v'.`
//     // },
//     required: true,
//   }


// });

// // Create and export OnPickup model
// export default mongoose.model("OnPickup", onPickupSchema);




import mongoose from "mongoose";

const pickSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    // nic: {
    //   type: Number,
    //   required: false,
    // },


    address: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const PICK = mongoose.model("PICK", pickSchema);

export default PICK;
