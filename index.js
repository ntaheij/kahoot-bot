const Kahoot = require('kahoot.js-updated')
var express = require('express')
  , bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

function createClient(i, name, gamePin) {
    try {
    var client = new Kahoot;
    console.log("Joining kahoot... " + i);
    var b = name;
    client.join(gamePin, b+i);
    client.on("questionStart", question => {
        console.log("A new question has started, answering the first answer.");
        setTimeout(() => {
            question.answer(Math.floor(Math.random()*4));
        }, Math.random() * 4)
    });
    return client;
} catch (e) {}
}


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/kahoot.html`)
})
app.post('/start', (req, res) => {
    if (!req.body.gamePin) return res.send("gamePin not defined")
    if (!req.body.name) return res.send("name not defined")
    if (!req.body.amount) return res.send("amount not defined")
    for (let i=0;i<req.body.amount;i++) {
        setTimeout(() => {
            createClient(i+1, req.body.name,req.body.gamePin)
    
        }, (i*200))
    }
})
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

