const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = require('express')();

// connect to Mongo daemon
mongoose
  .connect(
    'mongodb://database:27017/express-mongo',
    //'mongodb://localhost:27017/express-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// DB schema
const ItemSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

Item = mongoose.model('item', ItemSchema);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
      res.send("App is running!");
  });


app.get("/getItems", (req, res) => {
    Item.find((err, items) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(items)
        }

    });
  });

//Post route
app.post('/add', (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        status: 'open'
    });  
    newItem.save((err, data) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Item Added")
        }
    });
});

app.put('/item/:id/update', (req, res) => {
    let itemId = req.params.id;
    Item.findByIdAndUpdate({_id:itemId},{$set:req.body}, (err, data) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Item Updated")
        }
    });
});
const port = 3000;
app.listen(port, () => console.log('Server running...'));