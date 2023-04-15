const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    const chunks = [];

    req.on("data", (chunk) => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
    });

    req.on("end", () => {
      const obj = JSON.parse(chunks.join(""));
      const value1 = obj.num1;
      const value2 = obj.num2;

      // Validate input
      if (value1 <= 0 || !Number.isInteger(value1)) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "num1 must be a positive integer" }));
        return;
      }

      if (value2 < 0 || !Number.isInteger(value2)) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({ error: "num2 must be a non-negative integer" })
        );
        return;
      }

      // Calculate result
      const result = Math.pow(value1, value2);

      // Send response
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ result }));
    });
  } else {
    // Handle invalid HTTP method
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid HTTP method" }));
  }
});

module.exports = server;
