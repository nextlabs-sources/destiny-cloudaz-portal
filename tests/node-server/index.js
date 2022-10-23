/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "5000";

let frontend_path = "../../dist/cloudaz-portal"
/**
 *  App Configuration
 */
app.use(express.static(path.join(__dirname, frontend_path)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Application Routes
 */

app.get("/api/v1/list", (req, res) => {

    console.log("[list] Body: ", req.body);
    console.log("[list] Query: ", req.query);
    console.log("[list] Params: ", req.params);
    let data = {
        status: 'ok',
        data: [
            {
                "data": [
                    {
                        "name": "John"
                    },
                    {
                        "dob": "1990-01-01"
                    },
                ]
            }
        ]
    }
    res.status(200).json(data);
});


app.post("/api/v1/add", (req, res) => {

    console.log("[add] Body: ", req.body);
    console.log("[add] Query: ", req.query);
    console.log("[add] Params: ", req.params);
    res.status(200).json({ status: 'ok', message: "Success" });
});

/**
 * Default Routes Definitions
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + frontend_path + '/index.html'));
    //res.status(200).send("WHATABYTE: Food For Devs");
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
