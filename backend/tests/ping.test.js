const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("GET /api/ping", async () => {
  await api
    .get("/api/ping")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
