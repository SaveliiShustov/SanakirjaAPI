const express = require("express");

const app = express();
const fs = require('fs');
let dictionary = [];
app.use(express.json());
app.use(express.urlencoded({extended: true}));

 function GetDictionary(path) 
 {
    dictionary = [];
    const data = fs.readFileSync(path, {
    encoding: "utf8",
    flag: "r",
  });
  const splitLines = data.split(/\r?\n/);
  splitLines.forEach((line) => {
    const words = line.split(" ");
    console.log(words);
    const word = {
      fin: words[0],
      eng: words[1],
    };
    dictionary.push(word);
    console.log(dictionary);
  });
 }
app.get("/words", (req, res) => {
    
  GetDictionary("./sanakirja.txt");
  res.json(dictionary);
});

app.get("/words/:fin", (req,res) => {
    const fin = String(req.params.fin);
    GetDictionary("./sanakirja.txt");
    const wordToFind = dictionary.find((word) => word.fin === fin);
    res.json(wordToFind ? wordToFind : {messsage: "User not found"});
  
});

app.post("/words", (req, res) => {
    const word = req.body;
    fs.appendFileSync("./sanakirja.txt", "\n" + word.fin + " " + word.eng);
    GetDictionary("./sanakirja.txt");
    res.json(dictionary);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});