const mongoose = require("mongoose"),
  { app } = require("./app.js"),
  url = "mongodb://127.0.0.1:27017/SFE-RS";
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await mongoose
    .connect(url, {}) // The second parameter is for the security profitable update
    .then((result) => console.log(`Listening on port ${PORT} ...`))
    .catch((err) => console.log(err));
});
