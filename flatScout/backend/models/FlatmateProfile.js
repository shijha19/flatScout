import mongoose from 'mongoose';

const FlatmateProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  preferredGender: { type: String, required: true },
  budget: { type: Number, required: true },
  locationPreference: { type: String, required: true },
  habits: {
    smoking: { type: String, required: true },
    pets: { type: String, required: true },
    sleepTime: { type: String, required: true },
    cleanliness: { type: String, required: true }
  },
  bio: { type: String, required: true }
});

const FlatmateProfile = mongoose.model('FlatmateProfile', FlatmateProfileSchema);
export default FlatmateProfile;
