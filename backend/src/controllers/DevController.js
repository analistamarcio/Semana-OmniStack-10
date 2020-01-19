const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { githubUsername, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ githubUsername });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${githubUsername}`
      );

      const { name = login, avatarUrl, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        githubUsername,
        name,
        avatarUrl,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão a no máximo 10km de distância
      // e que o novo Dev tenha pelo menos uma das tecnologias filtradas.

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
};
