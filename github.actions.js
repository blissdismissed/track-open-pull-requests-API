const fetch = require("node-fetch");
const options = require("./util/options");


async function pullData(user, reponame) {
  const setOptions = options("/repos/" + user + "/" + reponame + "/pulls");

  const response = await fetch(
    setOptions.baseUrl + setOptions.hostName + setOptions.path,
    {
      method: "GET",
      headers: setOptions.headers
    }
  );

  const data = await response.json();
  console.log(data);
  const output = await outputApiData(data, user, reponame);
  console.log(output);
  return output;
}

async function outputApiData(pulldata, user, reponame) {
  const output = await Promise.all(
    pulldata.reverse().map(async element => {

      const commitCount = await getCommitCount(element, user, reponame);
      console.log("CommitCount: ", commitCount);

      return {
        id: element.id,
        number: element.number,
        title: element.title,
        author: element.user.login,
        commit_count: commitCount
      };
    })
  );

  return output;
}

async function getCommitCount(element, user, reponame) {
  let startPage = 1;
  const commitsPerPage = 1;
  let numberOfCommits = 0;
  let commitData = [0];
  while (commitData.length > 0) {
    const commitOptions = options(
      "/repos/" +
        user +
        "/" +
        reponame +
        "/pulls/" +
        element.number +
        "/commits?per_page=" +
        commitsPerPage +
        "&page=" +
        startPage
    );

    const getCommitData = await fetch(
      commitOptions.baseUrl + commitOptions.hostName + commitOptions.path,
      {
        method: "GET",
        headers: commitOptions.headers
      }
    );

    commitData = await getCommitData.json();
    numberOfCommits += commitData.length;
    startPage += 1;
  }
  return numberOfCommits;
}

module.exports = {
  pullData: pullData
};
