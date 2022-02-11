const express = require("express");
const bodyParser = require("body-parser");
const { redirect } = require("express/lib/response");
const app = express();
// const fetch = require("node-fetch");
const request = require("request");


let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";

let meals = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("this server is on using port 3000");
});


app.get("/", (req, res) => {
    res.render(__dirname + "/index.ejs", { meals: [] });
});

const fetchData = async (ingredient) => {
    try {
        request(url + ingredient, { json: true }, async (error, res, body) => {
            if (error) {
                console.log(error);
            }
            else if (res.statusCode == 200) {
                meals = await body;
            }
        });
    }
    catch (error) {
        console.log(error)
    }
}


app.post("/search", (req, res) => {
    fetchData(req.body.ingredient);
    res.render(__dirname + "/index.ejs", { meals: meals.meals });

    // const response = await fetch(url + req.body.ingredient, {
    //     method: 'get',
    //     body: JSON.stringify(body),
    //     headers: { 'Content-Type': 'application/json' }
    // });
    // const data = await response.json();
})