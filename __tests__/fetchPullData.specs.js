const request = require("supertest");
const app = require("../app");
const controller = require("../controllers");

describe("Test data coming from API", () => {
  test("It should display the data in an array of json data with these specific keys", async () => {
    const data = await controller.fetchPulls();
    expect(data).toEqual({
      id: 1,
      number: 100,
      title: "Pull Title",
      author: "Jose Reyes",
      commit_count: 12
    });
  });
});
