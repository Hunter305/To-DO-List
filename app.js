const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const date = require(__dirname + "/views/date.js")

const items = ["EAT", "SLEEP"];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  let day = date.getDate()
  res.render("index", {
    listTitle: day,
    newListItem: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body)
  let item = req.body.newItem
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }

});

app.get("/work", function(req, res) {
  res.render("index", {
    listTitle: "Work List",
    newListItem: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about")
})

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.pust(item);
  res.redirect("/work")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
