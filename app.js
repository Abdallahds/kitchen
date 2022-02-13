import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.set("view engine", "ejs");

let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
let mealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

app.listen(3000, () => {
    console.log("this server is on using port 3000");
});


app.get("/", (req, res) => {
    res.render("index.ejs", { meals: [] });
});


app.post("/search", async (req, res) => {
    const response = await fetch(url + req.body.ingredient);
    const data = await response.json();
    res.render("index.ejs", { meals: await data.meals });
})


app.post("/mealDetails", async (req, res) => {
    const response = await fetch(mealUrl + req.body.moreDetails);
    const data = await response.json();
    res.render("meal.ejs", { meal: await data.meals });
})