const mongoose = require("mongoose"),
  { app } = require("./app.js"),
  port = 3000;

app.listen(port, async () => {
  await mongoose.connect(
    "mongodb+srv://RamziMuhammad:l6GeofOKP9TpYNxf@maincluster.6xxlif0.mongodb.net/SFE-API"
  );
  console.log(`Listening on port ${port} ...`);
});
