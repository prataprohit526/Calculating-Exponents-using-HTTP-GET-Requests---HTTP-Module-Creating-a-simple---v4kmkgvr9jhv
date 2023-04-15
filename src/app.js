const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    const chunks = [];

    req.on("data", (chunk) => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks);
      const value1 = obj.num1;
      const value2 = obj.num2;

      // Write code here to calculate power of a number
      const result = Math.pow(value1, value2);

      // Send the result back as the response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result }));
    });
  }
});

module.exports = server;
