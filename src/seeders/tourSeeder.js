const Tour = require("../models/tours");
const toursList = require("./tours.json");
const faker = require("faker");

toursList.forEach((element) => {
  element.images = faker.image.nature();
});

exports.seedTours = () => {
  Tour.find({}, (err, tour) => {
    if (err) {
      console.log(err);
    } else {
      if (!tour.length) {
        Tour.create(toursList, (err, createdTours) => {
          if (err) {
            console.log(err);
          } else {
            console.log("tours seeded");
          }
        });
      } else {
        console.log("tours have been seeded");
      }
    }
  });
};
