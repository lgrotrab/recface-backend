const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "4167d68b7c9047cea4efe9b0c85809bd",
});

const handleImageUrl = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json(err));
};

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Can't update entries"));
};

module.exports = {
  handleProfileUpdate,
  handleImageUrl,
};
