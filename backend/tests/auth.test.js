const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

const registerEndpoint = "/api/auth/register";

describe("Register a new user", () => {
  describe("sending username, password and name", () => {
    const dataToSend = {
      username: "nuno",
      password: "1234qwer",
      name: "Nuno Machado",
    };
    // #TODO should save user to db if username is not in use
    // #TODO should respond with a json with containing user id

    test("username not in use should respond with status code 201 and json format", async () => {
      await api
        .post(registerEndpoint)
        .send(dataToSend)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    test("username in use should respond with status code 400 and json format", async () => {
      await api
        .post(registerEndpoint)
        .send(dataToSend)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });

  test("without all fields should return 400", async () => {
    const missingFields = [
      {
        password: "1234qwer",
        name: "Nuno Machado",
      },
      {
        username: "nuno",
        name: "Nuno Machado",
      },
      {
        username: "nuno",
        password: "1234qwer",
      },
    ];

    for (const cenario of missingFields) {
      await api
        .post(registerEndpoint)
        .send(cenario)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    }
  });
});

afterAll(() => {
  mongoose.disconnect();
});
