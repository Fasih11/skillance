const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.set("debug", true);

const premierSchema = new Schema({
    verified_by_passport: { type: String, required: true },
    utility_bill: { type: String, required: true },
    driving_license: { type: String, required: true },
    consent: { type: String, required: true },
    recent_photo: { type: String, required: true },
    resume: { type: String, required: true },
    ni_number: { type: String, required: true },
    hourly_rate: { type: String, required: true },
    weekly_availability_hours: { type: String, required: true },
},
   { timestamps: true }
)

const virtual  = premierSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
premierSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) {
      ret.createdAt = new Date(ret.createdAt).toLocaleString(); // Convert createdAt
      ret.updatedAt = new Date(ret.updatedAt).toLocaleString(); // Convert updatedAt      
      delete ret._id
    }
})

premierSchema.on("index", function (err) {
    if (err) {
      console.error("premierModel index error: %s", err);
    } else {
      console.info("premierModel indexing complete");
    }
  });

exports.Premier = mongoose.model('Premier', premierSchema)