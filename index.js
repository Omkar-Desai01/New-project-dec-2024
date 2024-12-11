const http = require("http");
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello there</h1>");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
