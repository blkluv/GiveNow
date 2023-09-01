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
  topDonation1: {
    type: Number,
    default: 0
  },
  topDonation2: { 
    type: Number,
    default: 0
  },
  topDonation3:{ 
    type: Number,
    default: 0
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