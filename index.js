//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.put('/', function (req, res) {
  res.send(findTopLayers(req));
});

//Find the top-view of the binary search tree
function findTopLayers(req) {
  var leftMostCount = 0;
  var rightMostCount = 0;
  var left = "";
  var right = "";

  var leftValue = req.body.left;
  while(leftValue != null)
  {
    left = leftValue.value + left;
    leftValue = leftValue.left;
    leftMostCount--;
  }

  var rightValue = req.body.right;
  while(rightValue != null)
  {
    right = right + rightValue.value;
    rightValue = rightValue.right;
    rightMostCount++;
  }

  var response = left + req.body.value + right;
  return checkUnderlyingRoots(req.body, response, leftMostCount, rightMostCount, 0);
}

//Check if any roots extend farther out than the top level nodes
function checkUnderlyingRoots (root, response, leftMostCount, rightMostCount, location) {
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

  if(root.left != null) response = checkUnderlyingRoots(root.left, response, leftMostCount, rightMostCount, location - 1) + leftResponse;
  if(root.right != null) response = rightResponse + checkUnderlyingRoots(root.right, response, leftMostCount, rightMostCount, location + 1);

  return  leftResponse + response + rightResponse ;
}

//Start Application
app.listen(3000, function () {
  console.log("Listening to port 3000!");
});

//EXAMPLE INPUT:
// {
//   "value": 10,
//   "left": {
//     "value": 9,
//     "left": {
//       "value": 7,
//       "left": null,
//       "right": null
//     },
//     "right": {
//       "value": 6,
//       "left": {
//         "value": 5,
//         "left": null,
//         "right": null
//       },
//       "right": {
//         "value": 4,
//         "left": {
//           "value": 3,
//           "left": null,
//           "right": null
//         },
//         "right": {
//           "value": 2,
//           "left": null,
//           "right": null
//         }
//       }
//     }
//   },
//   "right": {
//     "value": 8,
//     "left": null,
//     "right": null
//   }
// }

//EXPECTED RESPONSE:
//791082
