import { formatDate } from "../../data/handler";
import "./IssueList.css";

function IssueList({ $target, issueList, modal, removeIssue, status }) {
  this.$element = document.createElement("ul");
  this.$element.className = "issueList";
  this.$element.dataset.status = status;
  $target.appendChild(this.$element);

  this.state = {
    issueList: issueList,
  };

  this.setState = ({ issueList }) => {
    this.state = { issueList: issueList };

    this.render();
  };

  this.renderIssueItem = (issue) => `
    <li class="issueItem" draggable="true" data-issue-number="${issue.issueNumber}">
      <div class="row">
        ${issue.issueNumber}
        <div>
          <button id="modifyButton" value="${issue.issueNumber}">수정</button>
          <button id="removeButton" value="${issue.issueNumber}">삭제</button>
        </div>
      </div>
      <div class="row">${issue.title}</div>
      <div class="row">
        <p>${issue.managerId}</p>
        <p>${formatDate(issue.updatedDate)}</p>
      </div>
    </li>
  `;

  this.render = () => {
    this.$element.innerHTML = this.state.issueList.map(this.renderIssueItem).join("");
  };

  this.render();

  this.updateList = (list) => {
    this.setState({ issueList: list });
  };

  const handleRemoveButtonClick = (issueNumber) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      removeIssue(issueNumber, status);
    }
  };

  const handleModifyButtonClick = (issueNumber) => {
    const { title, managerId } = this.state.issueList.find(
      (issue) => issue.issueNumber === issueNumber
    );

    modal.open({
      action: "modify",
      issueNumber: issueNumber,
      title: title,
      managerId: managerId,
      status: status,
    });
  };

  this.$element.addEventListener("click", (e) => {
    const issueNumber = e.target.value;

    if (e.target.id === "removeButton") {
      handleRemoveButtonClick(issueNumber);
    }

    if (e.target.id === "modifyButton") {
      handleModifyButtonClick(issueNumber);
    }
  });

  this.$element.addEventListener("dragenter", () => {
    this.$element.classList.add("dragOver");
  });

  this.$element.addEventListener("dragleave", (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.$element.classList.remove("dragOver");
  });

  this.$element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}

export default IssueList;
