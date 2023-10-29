const mongoose = require("mongoose");
const { Premier } = require("../model/Premier");

exports.storePremier = async (req, res) => {
  const files = req.files;
  
  // Check if the expected files are in the request
  if (!files || !files.verified_by_passport || !files.utility_bill || !files.driving_license || !files.consent || !files.recent_photo || !files.resume) {
    return res.status(400).json({
      success: false,
      message: "Missing or invalid file uploads",
    });
  }
  
  // Extract file paths
  const data = {
    verified_by_passport: files.verified_by_passport[0].path,
    utility_bill: files.utility_bill[0].path,
    driving_license: files.driving_license[0].path,
    consent: files.consent[0].path,
    recent_photo: files.recent_photo[0].path,
    resume: files.resume[0].path,
    ni_number: req.body.ni_number,
    hourly_rate: req.body.hourly_rate,
    weekly_availability_hours: req.body.weekly_availability_hours,
  };

  const premier = new Premier(data);

  try {
    const doc = await premier.save();
    return res.status(200).json({
      success: true,
      message: "Successfully saved data",
      data: doc,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};
