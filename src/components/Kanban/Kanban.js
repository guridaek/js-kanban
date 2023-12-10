import "./Kanban.css";
import Column from "../Column/Column";
import Modal from "../Modal/Modal";
import { getIssueList, updateIssueList, updateNextNumber } from "../../data/storageHandler";
import { findClosestIndex } from "../../utils/listElement";
import { STATUS } from "../../data/constants";

function Kanban({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "kanban";
  $target.appendChild(this.$element);

  this.state = getIssueList();
  this.draggedIssueNumber = null;
  this.draggedStatus = null;

  this.setState = ({ nextNumber, toDoList, inProgressList, doneList }) => {
    const prevState = { ...this.state };

    this.state = {
      nextNumber: nextNumber || this.state.nextNumber,
      toDoList: toDoList || this.state.toDoList,
      inProgressList: inProgressList || this.state.inProgressList,
      doneList: doneList || this.state.doneList,
    };

    this.updateColumns(prevState);
  };

  this.updateColumns = (prevState) => {
    const columns = [
      { column: toDoColumn, list: this.state.toDoList, prevList: prevState.toDoList },
      {
        column: inProgressColumn,
        list: this.state.inProgressList,
        prevList: prevState.inProgressList,
      },
      { column: doneColumn, list: this.state.doneList, prevList: prevState.doneList },
    ];

    columns.forEach(({ column, list, prevList }) => {
      if (list !== prevList) column.updateList(list);
    });

    updateNextNumber(this.state.nextNumber);
    updateIssueList({
      nextNumber: this.state.nextNumber,
      toDoList: this.state.toDoList,
      inProgressList: this.state.inProgressList,
      doneList: this.state.doneList,
    });
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
    };

    this.setState({
      nextNumber: this.state.nextNumber + 1,
      toDoList: [...this.state.toDoList, issue],
    });
  };

  const removeIssue = (issueNumber, status) => {
    const list = this.state[`${status}List`];
    const updatedList = list.filter((issue) => issue.issueNumber !== issueNumber);

    this.setState({
      [`${status}List`]: updatedList,
    });
  };

  const modifyIssue = ({ issueNumber, title, managerId, status }) => {
    const list = this.state[`${status}List`];
    const updatedList = list.map((issue) => {
      if (issue.issueNumber !== issueNumber) return issue;

      return {
        ...issue,
        title: title,
        managerId: managerId,
        updatedDate: new Date(),
      };
    });

    this.setState({
      [`${status}List`]: updatedList,
    });
  };

  const moveIssue = ({ issueNumber, fromStatus, toStatus, toIndex }) => {
    const fromList = [...this.state[`${fromStatus}List`]];
    const toList = [...this.state[`${toStatus}List`]];

    const idx = fromList.findIndex((issue) => issue.issueNumber === issueNumber);
    if (idx === -1) return;

    const removedIssue = fromList[idx];
    const updatedFromList = fromList.filter((issue) => issue.issueNumber !== issueNumber);
    const updatedToList = [...toList];

    if (fromStatus === toStatus) updatedToList.splice(idx, 1);

    updatedToList.splice(0 <= toIndex ? toIndex : updatedToList.length, 0, removedIssue);

    this.setState({
      [`${fromStatus}List`]: updatedFromList,
      [`${toStatus}List`]: updatedToList,
    });
  };

  this.render();

  const handleDragStart = (e) => {
    const issueNumber = e.target.dataset.issueNumber;
    const status = e.target.closest(".issueList").dataset.status;

    this.draggedIssueNumber = issueNumber;
    this.draggedStatus = status;
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedColumn = e.target.closest(".issueList");
    const toStatus = droppedColumn.dataset.status;

    droppedColumn.classList.remove("dragOver");

    const toIndex = findClosestIndex(e.clientX, e.clientY);

    moveIssue({
      issueNumber: this.draggedIssueNumber,
      fromStatus: this.draggedStatus,
      toStatus: toStatus,
      toIndex: toIndex,
    });
  };

  this.$element.addEventListener("dragstart", handleDragStart);
  this.$element.addEventListener("drop", handleDrop);

  const modal = new Modal({ $target: $target, addIssue: addIssue, modifyIssue: modifyIssue });

  this.$contents = document.querySelector(".contents");

  const toDoColumn = new Column({
    $target: this.$contents,
    title: "to-do",
    issueList: this.state.toDoList,
    modal: modal,
    status: STATUS.TODO,
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });

  const inProgressColumn = new Column({
    $target: this.$contents,
    title: "in progress",
    issueList: this.state.inProgressList,
    modal: modal,
    status: STATUS.IN_PROGRESS,
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });

  const doneColumn = new Column({
    $target: this.$contents,
    title: "done",
    issueList: this.state.doneList,
    modal: modal,
    status: STATUS.DONE,
    removeIssue: removeIssue,
    modifyIssue: modifyIssue,
  });
}

export default Kanban;
