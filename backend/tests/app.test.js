const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("GET /api/ping", async () => {
  await api
    .get("/api/ping")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Unregistered endpoint must return 404 and json error message", async () => {
  await api
    .get("/api/this-endpoint-should-not-exist")
    .expect(404)
    .expect("Content-Type", /application\/json/);
});
