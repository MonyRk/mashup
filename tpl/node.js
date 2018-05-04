const Vision = require('@google-cloud/vision');

// Creates a client
const vision1 = new Vision();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
 const fileName = 'prueba.jpg';

// Performs property detection on the local file
vision.imageProperties({ source: { filename: fileName } })
  .then((results) => {
    const properties = results[0].imagePropertiesAnnotation;
    const colors = properties.dominantColors.colors;
    colors.forEach((color) => console.log(color));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });