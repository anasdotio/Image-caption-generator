const imageKit = require("../config/imageKit.js");

const uploadFile = async (fileBuffer, fileName) => {
  try {
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName,
      folder: "aicaption",
      useUniqueFileName: true,
    });

    return response;
  } catch (err) {
    console.error("An error occurred during upload:", err);
  }
};

module.exports = uploadFile;
