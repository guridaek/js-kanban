import IssueList from "../IssueList/IssueList";
import "./Column.css";

function Column({ $target, title, issueList, modal, removeIssue, modifyIssue, status }) {
  this.$element = document.createElement("div");
  this.$element.className = "column";
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
    <div class="title">
    ${title}
    <button class="addIssue">항목 추가</button>
    </div>
    `;
  };

  this.render();

  this.updateList = (list) => {
    contents.updateList(list);
  };

  const handleAddIssueClick = () => {
    modal.open({ action: "add" });
  };

  this.$element.querySelector(".addIssue").addEventListener("click", handleAddIssueClick);

  const contents = new IssueList({
    $target: this.$element,
    issueList: issueList,
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
    modal: modal,
    status: status,
  });
}

export default Column;
