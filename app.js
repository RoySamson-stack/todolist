const express = require('express');

const bodyParser = require('body-parser');
const mongooose = require("mongoose")


const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String,
}

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
  name: "Buy eggs"
})
const item2 = new Item({
  name: "Go to Freds House"
})
const item3 = new Item({
  name: "Buy Flour"
})

app.get("/", function (req, res) {
      
res.render("list", {listTitle: "Today", newListItems: items});

      })

      app.post("/", (req, res) =>{
        var item = req.body.newItem;

        items.push(item);

        res.redirect("/", )
      })
    app.listen(5500, function () {
      console.log("Server is running on port 5500");
    });