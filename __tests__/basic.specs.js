const request = require("supertest");
const app = require("../app");

describe("Test root path", () => {
  // test basic landing page
  test("It should respond with correct status", async () => {
    const response = await request(app).get("/github_api");
    expect(response.statusCode).toBe(200);
  });

  test("It should display the right message", async () => {
    const response = await request(app).get("/github_api");
    expect(response.text).toEqual("Boom, GitHub API!");
  });

});
