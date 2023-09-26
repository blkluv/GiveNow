const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amountraised:{
    type: Number,
    default: 0
  },
category:{
  type: String,
  required: true,
},
image: {
  type: String,  // Assuming storing image URLs or paths
},
donationsmade:{
  type: Number,
  default: 0
},
date: {
  type: Date,
  default: Date.now,
  get: (timestamp) => dateFormat(timestamp),
},
  // Add other organization-related fields here
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}

);


const Organization = model('Organization', organizationSchema);

module.exports = Organization;