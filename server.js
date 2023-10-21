const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();



var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// app.get("/sec", (req, res) => {
//   const randomId = Math.floor(Math.random() * 25) + 1;
//   res.json()
//   // res.json({ message: "Welcome to Second application." });
// });

app.get("/sec", async (req, res) => {
const tut = require("./app/models/tutorial.model.js");

  // Generate a random id between 1 and 25 (inclusive)
  const randomId = Math.floor(Math.random() * 25) + 1;

  try {
    //res.redirect(`/api/tutorials/${randomId}`)
    tut.findById(randomId, (err, data) => {
      //console.log(req.params.id)
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${randomId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + randomId
          });
        }
      } else res.send(`<html><body><h1><br/>${process.env["DB_PORT"]}</h1><br/>${JSON.stringify(data)}</body></html>`);
    // else res.send(`<html><body><h1>${process.env["dummy"]}</h1><br/>${data}</body></html>`);
    });
    // Make an internal HTTP request to /api/tutorials/:id
    // console.log(randomId)
    // const response = await request.get({
    //   uri: `http://127.0.0.1:8080/api/tutorials/${randomId}`, // Replace PORT with your actual port number
    //   json: true,
    // });

    // // Send the response to the client
    // res.json(response);
    
  } catch (error) {
    // Handle any errors that may occur during the request
    res.status(500).json({ error: "Internal server error" });
  }
});


require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Env ${process.env["DB_PORT"]}`);
  console.log(`Env ${process.env["DB_USER"]}`);
  console.log(`Env ${process.env["DB_HOST"]}`);
  console.log(`Env ${process.env["DB_PASSWORD"]}`);
  console.log(`Username: ${process.env["SPRING_DATASOURCE_USERNAME"]}`);
});
