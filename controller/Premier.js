const mongoose = require("mongoose");
const { Premier } = require("../model/Premier");

exports.storePremier = async (req, res) => {
  const files = req.files;
  const data = {
    verified_by_passport: files.verified_by_passport[0].path,
    utility_bill: files.utility_bill[0].path,
    driving_license: files.driving_license[0].path,
    concent_recived: files.concent_recived[0].path,
    recent_photo: files.recent_photo[0].path,
    resume: files.resume[0].path,
    ni_number: req.body.ni_number,
    // daily_or_hourly_date: req.body.daily_or_hourly_date,
    // availablity_hours: req.body.availablity_hours,
    daily: req.body.daily,
    hourly: req.body.hourly,
  };

  const premier = new Premier(data);

  try {
    const doc = await premier.save();
    return res.status(200).json({
      success: true,
      message: "Successfully saved data",
      data: doc, // Use 'doc' instead of 'saved_data'
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};
