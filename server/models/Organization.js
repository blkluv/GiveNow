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
  },
category:{
  type: String,
  required: true,
}
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