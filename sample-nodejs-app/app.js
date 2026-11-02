const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0'
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  let result;

  switch (req.body.operator) {
    case "+":
      result = num1 + num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      return res.status(400).send("Invalid operator");
  }

  res.send(`<h2>That was easy, your result is: ${result}</h2><a href="/">Back to calculator</a>`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
});
