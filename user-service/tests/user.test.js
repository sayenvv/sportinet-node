const request = require("supertest");
const app = require("../src/app");

describe("GET /users/:id", () => {
  it("should return user data", async () => {
    const response = await request(app).get("/users/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("username");
  });
});
