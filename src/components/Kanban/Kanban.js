import "./Kanban.css";
import Column from "../Column/Column";

const ISSUE_LIST = {
  nextNumber: 4,
  list: [
    {
      issueNumber: "ISSUE-000",
      title: "이슈 제목입니다123",
      managerId: "어피치",
      updatedDate: new Date(),
      status: "toDo",
    },
    {
      issueNumber: "ISSUE-001",
      title: "이슈 제목입니다456",
      managerId: "라이언",
      updatedDate: new Date(),
      status: "inProgress",
    },
    {
      issueNumber: "ISSUE-002",
      title: "이슈 제목입니다789",
      managerId: "죠르디",
      updatedDate: new Date(),
      status: "done",
    },
    {
      issueNumber: "ISSUE-003",
      title: "이슈 제목입니다012",
      managerId: "가람",
      updatedDate: new Date(),
      status: "toDo",
    },
  ],
};

function Kanban({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "kanban";
  $target.appendChild(this.$element);

  this.state = {
    nextNumber: ISSUE_LIST.nextNumber,
    issueList: ISSUE_LIST.list,
  };

  this.setState = ({ nextNumber, issueList }) => {
    this.state = { nextNumber: nextNumber, issueList: issueList };

    toDoColumn.setState(issueList.filter((issue) => issue.status === "toDo"));
    inProgressColumn.setState(issueList.filter((issue) => issue.status === "inProgress"));
    doneColumn.setState(issueList.filter((issue) => issue.status === "done"));
  };

  this.render = () => {
    this.$element.innerHTML = `
      <header>칸반 보드</header>
      <div class="contents"></div>
    `;
  };

  this.render();

  const addIssue = ({ title, managerId }) => {
    const issue = {
      issueNumber: `ISSUE-${this.state.nextNumber.toString().padStart(3, "0")}`,
      title: title,
      managerId: managerId,
      updatedDate: new Date(),
      status: "toDo",
    };

    this.setState({
      nextNumber: this.state.nextNumber + 1,
      issueList: [...this.state.issueList, issue],
    });
  };

  this.$contents = document.querySelector(".contents");

  const toDoColumn = new Column({
    $target: this.$contents,
    title: "to-do",
    issueList: this.state.issueList.filter((issue) => issue.status === "toDo"),
    addIssue: addIssue,
  });

  const inProgressColumn = new Column({
    $target: this.$contents,
    title: "in progress",
    issueList: this.state.issueList.filter((issue) => issue.status === "inProgress"),
    addIssue: addIssue,
  });

  const doneColumn = new Column({
    $target: this.$contents,
    title: "done",
    issueList: this.state.issueList.filter((issue) => issue.status === "done"),
    addIssue: addIssue,
  });
}

export default Kanban;
