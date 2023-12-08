import "./IssueList.css";

function IssueList({ $target, issueList, removeIssue }) {
  this.$element = document.createElement("ul");
  this.$element.className = "issueList";
  $target.appendChild(this.$element);

  this.state = {
    issueList: issueList,
  };

  this.setState = (updatedList) => {
    this.state = { issueList: updatedList };

    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `${this.state.issueList
      .map(
        (issue) => `<li class="issueItem">
          <div class="row">
            ${issue.issueNumber}
            <div>
              <button id="modifyButton">수정</button>
              <button id="removeButton" value=${issue.issueNumber}>삭제</button>
            </div>
          </div>
          <div class="row">${issue.title}</div>
          <div class="row">
            <p>${issue.managerId}</p>
            <p>${`${issue.updatedDate.toLocaleString()}`}</p>
          </div>
        </li>`
      )
      .join("")}`;
  };

  this.render();

  this.$element.addEventListener("click", (e) => {
    if (e.target.id !== "removeButton") return;

    removeIssue(e.target.value);
  });
}

export default IssueList;
