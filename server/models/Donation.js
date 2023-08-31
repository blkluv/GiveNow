const { Schema, model } = require('mongoose');

const donationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    organization: { // Reference to the Organization schema
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    // Add other donation-related fields here
  }
);

const Donation = model('Donation', donationSchema);

module.exports = Donation;
