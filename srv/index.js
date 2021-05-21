const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// add middleware
app.use(express.static(path.join(__dirname, "build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
