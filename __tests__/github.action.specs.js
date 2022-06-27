// const options = require("../util/options");
// const github = require("../github.actions");

const { GithubActions } = require("../github.actions");
// import { outputApiData } from '../github.actions';

const user = "john";
const reponame = "test-repo";

// const setOptions = options("/repos/" + user + "/" + reponame + "/pulls");
// const url = setOptions.baseUrl + setOptions.hostName + setOptions.path;

// const mockoOutputData = {
//   id: 1,
//   number: 2,
//   title: "Test Pull Request",
//   author: "Bob",
//   commit_count: 4
// };

// jest.mock("../github.actions");
// const mockGithubAction = require("../github.actions");

jest.mock("../github.actions", () => ({
  ...jest.requireActual("../github.actions"),
  getCommitCount: jest.fn().mockReturnValue(2),
  outputApiData: jest.fn((a, b) => {
    return [
      { output: "1 mock api results!" },
      { output: "2 mock api results!" }
    ];
  })
}));

// mockGithubAction.pullData = jest.fn((user, reponame) => {
//   return mockoOutputData;
// });

// mockGithubAction.outputApiData = jest.fn((pulldata, user, reponame) => {
//   return mockoOutputData;
// });

// mockGithubAction.getCommitCount = jest.fn((element, user, reponame) => {
//   return 4;
// });

describe("test github pull data action", () => {
  let service = new GithubActions({});

  beforeEach(() => {
    service = new GithubActions({ user: "john", repo: "test-repo" });
    // jest.mock(outputApiData);
    // outputApiData = jest.fn((a, b) => {
    //   return [{output: "1 mock api results!"}, {output: "2 mock api results!"}];
    // });
    jest.spyOn(service, "fetch").mockImplementation(async () => {
      return {
        json() {
          return [
            {
              id: 2,
              name: "Pull Request 2",
              title: "Title 2",
              user: { login: "User 2" }
            },
            {
              id: 1,
              name: "Pull Request 1",
              title: "Title 1",
              user: { login: "User 1" }

            }
          ];
        }
      };
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("#pullData", () => {
    it("It fetches pull data from specified github user and repo", async () => {
      const { url, options, data } = await service.pullData(user, reponame);
      console.log("data: ",data);

      expect(url).toEqual("https://api.github.com/repos/john/test-repo/pulls");
      expect(options).toEqual({
        method: "GET",
        headers: { "User-Agent": "blissdismissed" }
      });
      expect(data).toEqual([
        {
          id: 1,
          name: "Pull Request 1",
          title: "Title 1",
          user: { login: "User 1" }
        },
        {
          id: 2,
          name: "Pull Request 2",
          title: "Title 2",
              user: { login: "User 2" }
        }
      ]);
    });
  });
});

