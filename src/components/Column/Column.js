import IssueList from "../IssueList/IssueList";
import "./Column.css";

function Column({ $target, title, issueList }) {
  this.$element = document.createElement("div");
  this.$element.className = "column";
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <div class="title">
        ${title}
        <button>항목 추가</button>
      </div>
    `;
  };

  this.render();

  const contents = new IssueList({ $target: this.$element, issueList: issueList });
}

export default Column;
