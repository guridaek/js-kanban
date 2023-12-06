import "./IssueList.css";

function IssueList({ $target, issueList }) {
  this.$element = document.createElement("ul");
  this.$element.className = "issueList";
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `${issueList
      .map((issue) => `<li class="issueItem">${issue.title}</li>`)
      .join("")}`;
  };

  this.render();
}

export default IssueList;
