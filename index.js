//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.put('/balanced', function (req, res) {

  var left = "";
  var right = "";

  var leftValue = req.body.left;
  while(leftValue != null)
  {
    left = leftValue.value + left;
    leftValue = leftValue.left;
  }

  var rightValue = req.body.right;
  while(rightValue != null)
  {
    right = right + rightValue.value;
    rightValue = rightValue.right;
  }

  var response = left + req.body.value + right;
  res.send(response);
});

app.put('/Unbalanced', function (req, res) {

  var left = "";
  var right = "";

  var leftValue = req.body.left;
  while(leftValue != null)
  {
    left = leftValue.value + left;
    leftValue = leftValue.left;
  }

  var rightValue = req.body.right;
  while(rightValue != null)
  {
    right = right + rightValue.value;
    rightValue = rightValue.right;
  }

  var response = left + req.body.value + right;
  res.send(response);
});

app.put('/SeverelyUnbalanced', function (req, res) {

  var left = "";
  var right = "";

  var leftMostCount = 0;

  var leftValue = req.body.left;
  while(leftValue != null)
  {
    left = leftValue.value + left;
    leftMostCount++;
    leftValue = leftValue.left;
  }

  var rightMostCount = 0;

  var rightValue = req.body.right;
  while(rightValue != null)
  {
    right = right + rightValue.value;
    rightMostCount++;
    rightValue = rightValue.right;
  }

  var response = left + req.body.value + right;

  var fullresponse = checkOutliers(req.body, response, (leftMostCount * -1) , rightMostCount, 0)

  res.send(fullresponse);
});


app.listen(3000, function () {
  console.log("Listening to port 3000!");
});

function checkOutliers (root, response, leftMostCount, rightMostCount, location) {
  var leftResponse = "";
  var rightResponse = "";

  if( location < leftMostCount)
  {
    leftResponse = root.value + leftResponse;
    leftMostCount--;
  }

  if( location > rightMostCount)
  {
    rightResponse = rightResponse + root.value;
    rightMostCount++;
  }

  if(root.left != null)
  {
    response = checkOutliers(root.left, response, leftMostCount, rightMostCount, location - 1) + leftResponse;
  }
  if(root.right != null)
  {
    response = rightResponse + checkOutliers(root.right, response, leftMostCount, rightMostCount, location + 1);
  }



  return  leftResponse + response + rightResponse ;
}
