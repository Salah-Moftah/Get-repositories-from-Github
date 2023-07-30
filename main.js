let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getrepos();
};

//Get Repoes Functions
function getrepos() {
  if (theInput.value == "") {
    reposData.innerHTML = `<span>Please Write Username</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((results) => {
        let myData = results.json();

        return myData;
      })
      .then((repos) => {
        reposData.innerHTML = "";

        repos.forEach((ele) => {
          let mainDiv = document.createElement("div");
          let reponame = document.createTextNode(ele.name);

          reposData.appendChild(mainDiv);
          mainDiv.appendChild(reponame);

          let theUrl = document.createElement("a");
          let theUrlTxet = document.createTextNode("Visit");

          theUrl.href = `https://github.com/${theInput.value}/${ele.name}`;

          theUrl.setAttribute("target", "_blank");

          theUrl.appendChild(theUrlTxet);
          mainDiv.appendChild(theUrl);

          let starsSpan = document.createElement("span");
          let starsTxet = document.createTextNode(
            `Stars ${ele.stargazers_count}`
          );

          starsSpan.appendChild(starsTxet);
          mainDiv.appendChild(starsSpan);

          mainDiv.className = "repo-box";
        });
      });
  }
}
