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
      if (typeof value1 !== "number" || value1 <= 0 || value2 < 0) {
        res.writeHead(404, { "Content-type": "text/plain" });
        res.end("The operation cannot be performed");
      } else if (typeof value1 === "number" && typeof value2 === "number") {
        res.writeHead(200, { "Content-type": "text/plain" });
        res.end(`The result is ${Math.pow(value1, value2)}`);
      } else {
        res.writeHead(400, { "Content-type": "text/plain" });
        res.end(`400 Bad Request`);
      }
    });
  }
});

module.exports = server;
