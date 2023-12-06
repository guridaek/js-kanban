import "./Kanban.css";
import Column from "../Column/Column";

function Kanban({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "kanban";
  $target.appendChild(this.$element);

  this.state = {
    toDoList: [
      { title: "ISSUE-101" },
      { title: "ISSUE-101" },
      { title: "ISSUE-101" },
      { title: "ISSUE-101" },
    ],
    inProgressList: [{ title: "ISSUE-101" }, { title: "ISSUE-101" }],
    doneList: [{ title: "ISSUE-101" }, { title: "ISSUE-101" }, { title: "ISSUE-101" }],
  };

  this.render = () => {
    this.$element.innerHTML = `
      <header>칸반 보드</header>
      <div class="contents"></div>
    `;
  };

  this.render();

  this.$contents = document.querySelector(".contents");

  const toDoColumn = new Column({
    $target: this.$contents,
    title: "to-do",
    issueList: this.state.toDoList,
  });

  const inProgressColumn = new Column({
    $target: this.$contents,
    title: "in progress",
    issueList: this.state.inProgressList,
  });

  const doneColumn = new Column({
    $target: this.$contents,
    title: "done",
    issueList: this.state.doneList,
  });
}

export default Kanban;
