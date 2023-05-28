const express = require("express");
const app = express();
const cors = require("cors");
import { faker } from "@faker-js/faker";

app.use(express.json());
app.use(cors());

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
console.log(USERS);
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
