import IssueList from "../IssueList/IssueList";
import Modal from "../Modal/Modal";
import "./Column.css";

function Column({ $target, title, issueList, addIssue }) {
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

  const modal = new Modal({ $target: $target, addIssue: addIssue });

  this.$element.querySelector("#add-issue").addEventListener("click", () => {
    modal.$element.showModal();
  });

  const contents = new IssueList({ $target: this.$element, issueList: issueList });
}

export default Column;
