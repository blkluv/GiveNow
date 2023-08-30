const { Schema, model } = require('mongoose');

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
  }
 
  // Add other organization-related fields here
});

const Organization = model('Organization', organizationSchema);

module.exports = Organization;