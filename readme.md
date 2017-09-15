## Binary Tree Birds eye View
A web service that when passed a json binary tree, will return all the viewable numbers from a birds eye view.

examples:

================Balanced Binary Tree=====================================

{
  	"value": 1,
  	"left": {
		"value": 2,
		"left": {
			"value" : 3,
			"left":null,
			"right":null
		},
		"right":{
			"value": 4,
			"left": null,
			"right": null
		}
	},
  	"right":{
  		"value": 5,
 		"left":{
 			"value":6,
 			"left":null,
 			"right":null
 		},
 		"right":{
 			"value":7,
 			"left": null,
 			"right": null
 		}
	}
}



======================RESPONSE=============================


RESPONSE: 32157



SEVERELY UNBALANCED BINARY TREE=================


{
  "value": 10,
  "left": {
    "value": 9,
    "left": {
      "value": 7,
      "left": null,
      "right": null
    },
    "right": {
      "value": 6,
      "left": {
        "value": 5,
        "left": null,
        "right": null
      },
      "right": {
        "value": 4,
        "left": {
          "value": 3,
          "left": null,
          "right": null
        },
        "right": {
          "value": 2,
          "left": null,
          "right": null
        }
      }
    }
  },
  "right": {
    "value": 8,
    "left": null,
    "right": null
  }
}

==================RESPONSE============

791082
