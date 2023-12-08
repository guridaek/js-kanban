import IssueList from "../IssueList/IssueList";
import "./Column.css";

function Column({ $target, title, issueList, modal, removeIssue, modifyIssue }) {
  this.$element = document.createElement("div");
  this.$element.className = "column";
  $target.appendChild(this.$element);

  this.state = {
    issueList: issueList,
  };

  this.setState = (updatedList) => {
    this.state = {
      issueList: updatedList,
    };

    contents.setState(updatedList);
  };

  this.render = () => {
    this.$element.innerHTML = `
    <div class="title">
    ${title}
    <button id="add-issue">항목 추가</button>
    </div>
    `;
  };

  this.render();

  this.$element.querySelector("#add-issue").addEventListener("click", () => {
    modal.open({ action: "add" });
  });

  const contents = new IssueList({
    $target: this.$element,
    issueList: issueList,
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
    modal: modal,
  });
}

export default Column;
