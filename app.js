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

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model('List', listSchema)

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
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  })

  if(listName.length == "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: listName}, function(err, foundItems){
      foundItems.itesm.push();
      foundItems.save();
      res.redirect("/" + listName);
    })
  }

 

})

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;


  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted the checked item")
      res.redirect("/");
    }
  })
})

app.get('/:customListName', function (req, res) {
  const customListName = req.params.customListName;

  List.findOne({
    name: customListName
  }, function (err, foundItems) {
    if (!err) {
      if (!foundItems) {

        const list = new List({
          name: customListName,
          items: defaultItems
        })

        list.save()
        res.redirect("/")
      } else {
        res.render('list', {listTitle: foundItems.name, newListItems: foundItems.items})
      }
    }
  })

})




app.listen(5500, function () {
  console.log("Server is running on port 5500");
});