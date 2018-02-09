import mongoose from 'mongoose';
// Make Sure Mongoose Connection is Connected
if (mongoose.connection.readyState != mongoose.STATE_OPEN)
{
    mongoose.connect(process.env.MONGO_COMPOSE_URL||'mongodb://localhost/DigitalPartners');
}

import Profile from '../server/models/profile';
/* Docs: https://github.com/balmasi/migrate-mongoose */
export async function up() {
  Profile.update( { "organizationType.typeValues": { $nin: [ "", "Startup", "Small Enterprise", "Medium-sized Enterprise", "Multinational company", "NGO/non-profit organisation", "Open Source Project", "University", "Governmental Institution", "Industry Association", "Public-private hybrid" , "Think tank" , "Investor" , "Other" ] } } , { $set: { "organizationType.typeValues": "" }},  {multi: true})
  .then((response) => {
      console.log(response);
  })
  .catch((err) => {
      console.log(err);
  });
};
