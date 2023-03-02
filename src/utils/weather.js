const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e67728566581ab8687fb2d3ee40b2a7b&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service",undefined);
    } else if (body.error) {
      callback("unable to find location",undefined);
    } else {
      const data = body.current;
      callback(undefined,`It is currently ${data?.temperature} degrees out. It feels like ${data?.feelslike} degree out. Weather is  ${data.weather_descriptions}`
      );
    }
  });
};
module.exports = {forecast}
