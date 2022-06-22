const request = require("supertest");
const app = require("../app");
const controller = require("../controller");

describe("Test open pull request data coming from API", () => {

  test("It should return status code of 200", async () => {
    
    const response = await request(app).get('/pulls/:user/:reponame')
    expect(response.statusCode).toEqual(200);

    })

  test("It should display the data in an array of json data with these specific keys", async () => {
    const req = {
      params: {
        user: 'blissdismissed',
        reponame: 'test-repo'
      }
    }
    const res = {};
    const data = await controller.fetchPulls(req, res);
    expect(data).toEqual({
      id: 1,
      number: 100,
      title: "Pull Title",
      author: "Jose Reyes",
      commit_count: 12
    });
  });
});
