const fetch = require('node-fetch');
const options = require('./util/options');

 
async function pullData(user, reponame) {
  const setOptions = options("/repos/" + user + "/" + reponame + "/pulls");

  const response = await fetch(setOptions.baseUrl+setOptions.hostName+setOptions.path, {
    method: "GET",
    headers: setOptions.headers
  });

  const data = await response.json();
  console.log(data);

  const output = await Promise.all (data.map(async element => {
    const startPage = 1
    const commitsPerPage = 100;
    let numberOfCommits = 0;
  
    const commitOptions = options("/repos/" + user + "/" + reponame + 
          "/pulls/" + element.number + "/commits?per_page=" + commitsPerPage + "&page=" + startPage);
  
        const getCommitData = await fetch(commitOptions.baseUrl + commitOptions.hostName + commitOptions.path, {
          method: "GET",
          headers: commitOptions.headers
        });
  
        commitData = await getCommitData.json();
        console.log("Length: ", commitData.length);
        numberOfCommits = commitData.length;
      
  
    return {
      id: element.id,
      number: element.number,
      title: element.title,
      author: element.user.login,
      commit_count: numberOfCommits
    };

  })
  );
  return output;
}

module.exports = {
  pullData: pullData
}