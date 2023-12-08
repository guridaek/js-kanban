import "./IssueList.css";

function IssueList({ $target, issueList }) {
  this.$element = document.createElement("ul");
  this.$element.className = "issueList";
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `${issueList
      .map(
        (issue) => ` <li class="issueItem">
          <div class="row">
            ${issue.issueNumber}
            <div>
              <button>수정</button>
              <button>삭제</button>
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
}

export default IssueList;
