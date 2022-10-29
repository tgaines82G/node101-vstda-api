const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// add your code here
let intData = [{
        todoItemId: 0,
        name: "an item",
        priority: 3,
        completed: false,
    },
    {
        todoItemId: 1,
        name: "another item",
        priority: 2,
        completed: false,
    },
    {
        todoItemId: 2,
        name: "a done item",
        priority: 1,
        completed: true,
    },
];

//had to move our app.use down here for some reason, kept getting error when left at the top
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).send({
        status: "ok",
    });
});

app.get("/api/TodoItems", (req, res) => {
    res.json(intData).status(200);
});

//we are trying to get a single id printed, not the entire data like the previous .get
app.get("/api/TodoItems/:id", (req, res) => {
    // intData.forEach((el,i)=>{
    //     if(el.todoItemId == req.params.id){
    //         res.status
    //     }
    // })
    //we cycle through our data and compare to our requested param id given by the test, and response with the status and the data of a single item
    for (let i = 0; i < intData.length; i++) {
        if (intData[i].todoItemId == req.params.id) {
            res.status(200).json(intData[i]);
            return;
        }
    }
});

//adding an item and then overwriting it if it exists
app.post("/api/TodoItems", (req, res) => {
    //cycling through our data set
    for (let i = 0; i < intData.length; i++) {
        //if our req.body is equal to what is in our data set, we make them equal to one another
        if (req.body.todoItemId === intData[i].todoItemId) {
            intData[i] = req.body;
            //else we push the new data in our exsiting object/array
        } else {
            intData.push(req.body);
        }
    }
    res.status(201).send(req.body);
});

app.delete("/api/TodoItems/:id", (req, res) => {
    for (let i = 0; i < intData.length; i++) {
        //if our data is matched to another id, we want to remove it from our object
        if (intData[i]["todoItemId"] == req.params.id) {
            let deleted = intData.splice(i, 1);
            res.send(deleted[i]).status(200);
        }
    }
});

module.exports = app;