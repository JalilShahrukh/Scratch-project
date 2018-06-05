const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userController = require('./userController'); 

const DB_URI = 'mongodb://starfish4:admin1@ds039441.mlab.com:39441/starfish4'; 
mongoose.connect(DB_URI); 
mongoose.connection.once('open', () => { 
  console.log('Connected to Database.'); 
});

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyD-B9yL_qkpkcmHC9G6zE2i-odPFNKoEP4'
});

app.use(express.static(path.join(__dirname, './../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signup', userController.createUser);
app.post('/login', userController.verifyUser);

app.post('/addLocation', function(req, res) {
  let addedData = {};
  if(req.body.name) {
    addedData.name = req.body.name;
  }
  if(req.body.tags) {
    addedData.tags = req.body.tags.slice();
  }
  console.log('In server side - addedData: ',addedData);
  googleMapsClient.geocode({
    address: req.body.name
  }, function(err, response) {
    if (!err) { 
      console.log('In server side - google map result[0].formatted_address: ',response.json.results[0].formatted_address);
      addedData.googleInfo = [];
      addedData.googleInfo.push(response.json.results[0].formatted_address);
      console.log('In server side - after google map api - addedData: ', addedData);
      res.json(addedData);
    } else {
      console.log('Error: ',err);
      res.json(addedData);
    }
  });
});

app.listen(3000, (err) => {
  if (err) return err;
});