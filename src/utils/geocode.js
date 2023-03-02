const request = require("postman-request");
const geocode = (address, callback) => {
  try {
    const url = `http://api.positionstack.com/v1/forward?access_key=c7081e51b43494f06c66e8d52276ac45&query=${address}`;
    request({ url, json: true }, (error, { body } = {}) => {
      try {
        if (error) {
          callback("unable to connect to location services", undefined);
        } else if (body?.data?.length === 0) {
          callback("unable to find cordinates", undefined);
        } else {
          callback(undefined, {
            latitude: body?.data[0]?.latitude,
            longitude: body?.data[0]?.longitude,
            location: body?.data[0]?.name,
          });
        }
      } catch (e) {
        callback("Something went Wrong", undefined);
      }
    });
  } catch (e) {
    callback(e, undefined);
  }
};

module.exports = { geocode };
