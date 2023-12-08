import { formatDate } from "../../data/handler";
import "./IssueList.css";

function IssueList({ $target, issueList, modal, removeIssue }) {
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
              <button id="modifyButton" value=${issue.issueNumber}>수정</button>
              <button id="removeButton" value=${issue.issueNumber}>삭제</button>
            </div>
          </div>
          <div class="row">${issue.title}</div>
          <div class="row">
            <p>${issue.managerId}</p>
            <p>${formatDate(issue.updatedDate)}</p>
          </div>
        </li>`
      )
      .join("")}`;
  };

  this.render();

  this.$element.addEventListener("click", (e) => {
    const issueNumber = e.target.value;

    if (e.target.id === "removeButton") {
      removeIssue(issueNumber);

      return;
    }

    if (e.target.id === "modifyButton") {
      const { title, managerId } = this.state.issueList.find(
        (issue) => issue.issueNumber === issueNumber
      );

      modal.open({
        action: "modify",
        issueNumber: issueNumber,
        title: title,
        managerId: managerId,
      });
    }
  });
}

export default IssueList;
