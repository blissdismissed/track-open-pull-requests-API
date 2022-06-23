const controller = require("../controller");

jest.mock("../github.actions");
const mockGithubAction = require("../github.actions");
mockGithubAction.pullData = jest.fn((a, b) => {
  return "mock api results!";
});

const res = {
  json: jest.fn()
};
const req = {
  params: {
    user: "blissdismissed",
    reponame: "test-repo"
  }
};

describe("test the fetchPulls action ", () => {
  afterEach(jest.clearAllMocks);
  test("it should take user and reponame as input parameters from the request", async () => {
    await controller.fetchPulls(req, res);
    expect(mockGithubAction.pullData).toHaveBeenCalledTimes(1);
    expect(mockGithubAction.pullData.mock.calls[0][0]).toBe(req.params.user);
    expect(mockGithubAction.pullData.mock.calls[0][1]).toBe(req.params.reponame);
  });

  test("it should return data coming from the github action function", async () => {
    await controller.fetchPulls(req, res);
    expect(mockGithubAction.pullData).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls[0]).toEqual(["mock api results!"]);
  });
});