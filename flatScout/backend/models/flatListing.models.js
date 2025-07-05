import mongoose from 'mongoose';

const flatListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  section: {
    type: String,
    enum: ['saved', 'scheduled', 'visited'],
    default: 'saved',
    required: true
  },
  createdBy: {
    type: String, // user email or id
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FlatListing = mongoose.model('FlatListing', flatListingSchema, 'flat-listings');
export default FlatListing;
