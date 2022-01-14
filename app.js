const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require("mongoose")


const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true
});

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

const defaultItems = [item1, item2, item3]


// Item.insertMany(defaultItems, function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully added the items")
//   }
// })


app.get("/", function (req, res) {



  Item.find({}, function (err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Successfully added the items to the database")
        }
      })
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }

  })



})

app.post("/", (req, res) => {
  const  itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  })

  item.save();

  res.redirect("/");

})

app.post("/delete", function(req, res){
const checkedItemId = req.body.checkbox;


Item.findByIdAndRemove(checkedItemId, function(err){
  if(!err){
    console.log("Successfully deleted the checked item")
    res.redirect("/");
  }
})
})
app.listen(5500, function () {
  console.log("Server is running on port 5500");
});