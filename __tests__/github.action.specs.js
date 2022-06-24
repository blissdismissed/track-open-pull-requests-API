const options = require("../util/options");
const github = require("../github.actions");


const mockoOutputData = {
  id: 1,
  number: 2,
  title: "Test Pull Request",
  author: "Bob",
  commit_count: 4
};

jest.mock("../github.actions");
const mockGithubAction = require("../github.actions");

mockGithubAction.pullData = jest.fn((user, reponame) => {
  return mockoOutputData;
});

mockGithubAction.outputApiData = jest.fn((pulldata, user, reponame) => {
  return mockoOutputData;
});

mockGithubAction.getCommitCount = jest.fn((element, user, reponame) => {
  return 4;
});


const user = "john";
const reponame = "test-repo";



describe("test github action pullData function", () => {
  let result;
  describe("it should have two inputs of user and reponame", () => {
    beforeEach(async () => {
      result = await github.pullData(user, reponame);
    });
    it("should have the correct inputs and outputs", () => {
      expect(mockGithubAction.pullData.mock.calls[0][0]).toBe(user);
      expect(mockGithubAction.pullData.mock.calls[0][1]).toBe(reponame);
      expect(result).toEqual(mockoOutputData);
      
    });
  });
});

describe("test github action outputApiData function", () => {

});

describe("test github action getCommitCount function", () => {

});


