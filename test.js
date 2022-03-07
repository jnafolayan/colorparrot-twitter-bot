const color = require("./src/color");
const templatesJSON = require("./src/templates.json");

/**
 *
 const {
   namedColors,
   namedColorsMap,
   findColors,
 } = await color.getNamedColors();
 */

test("make sure the findColor function works", async () => {
  const {
    findColors,
  } = await color.getNamedColors();

  expect(typeof findColors).toBe("object");
  expect(typeof findColors.getNamesForValues).toBe("function");

  const name = findColors.getNamesForValues(["#fedcba"]);

  expect(typeof name).toBe("object"); // array actually ;)
  expect(name.length).toBe(1);
  expect(name[0]).toHaveProperty("name");
});

test("extract colors from images", async () => {
  const {
    findColors,
  } = await color.getNamedColors();

  const colorsInImage = await color.getPalette(
    "https://pbs.twimg.com/media/E-y8HQsWEAQiiTl?format=jpg&name=small",
    9
  );

  expect(typeof colorsInImage).toBe("object");
  expect(colorsInImage.length).toBe(9);
  expect(colorsInImage[0]).toHaveProperty("name");
});



test("Make sure messages are not too long", async () => {
  for (const [category, messages] of Object.entries(templatesJSON)) {
    for (const message of messages) {
      expect(message.length).toBeLessThan(241);

      /*
        260 is the actual
        twitter max length
        but there are some rules regarding emoji etc..
        https: //developer.twitter.com/en/docs/counting-characters#:~:text=In%20most%20cases%2C%20the%20text,more%20characters%20as%20its%20weight.
      */
    }
  }
});
