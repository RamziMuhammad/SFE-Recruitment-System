const filesPayloadExists = (req, res, next) => {
  if (!req.files)
    // If we have no files in the request
    return res.status(400).json({ status: "Error!", message: "Missing files" });

  next();
};

module.exports = filesPayloadExists;
