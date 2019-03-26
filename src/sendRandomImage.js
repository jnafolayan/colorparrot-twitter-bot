const namedColors = require('color-name-list');
const randomImage = require('./utils/generateImage');
const sendImage = require('./utils/twitter/sendImage');
const checkIfColorExistsInTwitts = require(
    './redis/checkIfColorExistsInTwitts'
);
const addColorNameInPostedTwitts = require(
    './redis/addColorNameInPostedTwitts'
);

function generateRandomColor() {
  const randomColor = namedColors[
      Math.floor(Math.random() * namedColors.length)];
  return {name: randomColor.name, hex: randomColor.hex};
}

async function sendRandomImage(T) {
  const color = generateRandomColor();
  if (await checkIfColorExistsInTwitts(color.name)) {
    return sendRandomImage(T); // here can be a problem in the future!
  } else {
    await addColorNameInPostedTwitts(color.name);
  }
  const image = randomImage(color);
  const b64content = image.toString('base64');
  sendImage(T, b64content, `random image hex: ${color.hex}`);
}

module.exports = sendRandomImage;
