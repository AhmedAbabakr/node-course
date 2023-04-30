exports.handleInputData = (req) => {
    let data;
  
    if (req.body && req.files) {
      // For form data with files
      data = {
        ...req.body,
        image: req.files.image
      };
    } else if (req.body) {
      // For JSON or form data without files
      data = req.body;
    } else {
      // No input data provided
      return null;
    }
  
    return data;
  }