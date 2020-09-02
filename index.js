const Kahoot = require('kahoot.js-updated')
var express = require('express')
  , bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

function createClient(i, name, gamePin) {
    try {
    var client = new Kahoot;
    console.log("Joining kahoot...");
    var b = ""
    for (index=0;index<name.length;index++) {
        b += Math.random() < 0.25 ? name.charAt(index).toUpperCase() : name.charAt(index)
    }
    client.join(gamePin /* Or any other kahoot game pin */, b+i);
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
    for (let i=0;i<15;i++) {
        setTimeout(() => {
            createClient(i, req.body.name,req.body.gamePin)
    
        }, (i*125)*Math.random()*5)
    }
})

app.listen(process.env.port || 1337, () => {
    console.log("listening on port "+(process.env.port || 1337))
})
