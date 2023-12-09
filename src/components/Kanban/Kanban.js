import "./Kanban.css";
import Column from "../Column/Column";
import { getIssueList, updateIssueList, updateNextNumber } from "../../data/handler";
import Modal from "../Modal/Modal";

function Kanban({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "kanban";
  $target.appendChild(this.$element);

  this.state = getIssueList();

  this.draggedIssueNumber = null;

  this.setState = ({ nextNumber, issueList }) => {
    this.state = { nextNumber, issueList };

    toDoColumn.updateList(issueList.filter((issue) => issue.status === "toDo"));
    inProgressColumn.updateList(issueList.filter((issue) => issue.status === "inProgress"));
    doneColumn.updateList(issueList.filter((issue) => issue.status === "done"));

    updateNextNumber(nextNumber);
    updateIssueList(issueList);
  };

  this.render = () => {
    this.$element.innerHTML = `
      <header>칸반 보드</header>
      <div class="contents"></div>
    `;
  };

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

  const removeIssue = (issueNumber) => {
    const updatedList = this.state.issueList.filter((issue) => issue.issueNumber !== issueNumber);

    this.setState({
      ...this.state,
      issueList: updatedList,
    });
  };

  const modifyIssue = ({ issueNumber, title, managerId }) => {
    const updatedList = this.state.issueList.map((issue) => {
      if (issue.issueNumber !== issueNumber) return issue;

      return {
        ...issue,
        title: title,
        managerId: managerId,
        updatedDate: new Date(),
      };
    });

    this.setState({
      ...this.state,
      issueList: updatedList,
    });
  };

  const moveIssue = ({ issueNumber, toStatus }) => {
    const updatedList = this.state.issueList.map((issue) => {
      if (issue.issueNumber != issueNumber) return issue;

      return {
        ...issue,
        status: toStatus,
      };
    });

    this.setState({ ...this.state, issueList: updatedList });
  };

  this.render();

  this.$element.addEventListener("dragstart", (e) => {
    const issueNumber = e.target.dataset.issueNumber;

    this.draggedIssueNumber = issueNumber;
  });

  this.$element.addEventListener("drop", (e) => {
    e.preventDefault();

    const droppedColumn = e.target.closest(".issueList");
    const toStatus = droppedColumn.dataset.status;

    droppedColumn.classList.remove("dragOver");

    moveIssue({ issueNumber: this.draggedIssueNumber, toStatus: toStatus });
  });

  const modal = new Modal({ $target: $target, addIssue: addIssue, modifyIssue: modifyIssue });

  this.$contents = document.querySelector(".contents");

  const toDoColumn = new Column({
    $target: this.$contents,
    title: "to-do",
    issueList: this.state.issueList.filter((issue) => issue.status === "toDo"),
    modal: modal,
    status: "toDo",
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });

  const inProgressColumn = new Column({
    $target: this.$contents,
    title: "in progress",
    issueList: this.state.issueList.filter((issue) => issue.status === "inProgress"),
    modal: modal,
    status: "inProgress",
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });

  const doneColumn = new Column({
    $target: this.$contents,
    title: "done",
    issueList: this.state.issueList.filter((issue) => issue.status === "done"),
    modal: modal,
    status: "done",
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });
}

export default Kanban;
