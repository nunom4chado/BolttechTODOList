const app = require("./app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running: http://localhost:${PORT}`);
});
