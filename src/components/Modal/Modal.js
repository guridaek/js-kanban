import "./Modal.css";

function Modal({ $target, addIssue, modifyIssue }) {
  this.$element = document.createElement("dialog");
  $target.appendChild(this.$element);

  this.state = {
    action: "add",
    issueNumber: null,
  };

  this.setState = ({ action, issueNumber }) => {
    this.state = {
      action: action,
      issueNumber: action === "modify" ? issueNumber : null,
    };
  };

  this.render = () => {
    this.$element.innerHTML = `
      <form class="modal">
        <h2>항목 추가/수정</h2>
        <label>이슈 제목<input id="issueTitle" placeholder="이슈 제목을 입력해주세요" /></label>
        <label>담당자 id<input id="managerId" placeholder="담당자 id를 입력해주세요" /></label>
        <div class="buttonContainer">
          <button id="cancel" type="reset">취소</button>
          <button id="confirm" type="reset">확인</button>
        </div>
      </form>
    `;
  };

  this.render();

  this.open = ({ action, issueNumber }) => {
    console.log("open!", action, issueNumber);
    this.setState({ action, issueNumber });

    this.$element.showModal();
  };

  this.$element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) this.$element.close();
  });

  this.$element.querySelector("#cancel").addEventListener("click", () => {
    this.$element.close();
  });

  this.$element.querySelector("#confirm").addEventListener("click", () => {
    const newIssue = {
      title: this.$element.querySelector("#issueTitle").value,
      managerId: this.$element.querySelector("#managerId").value,
    };

    if (this.state.action === "add") {
      addIssue(newIssue);
    }

    if (this.state.action === "modify") {
      console.log("수정!", { ...newIssue, issueNumber: this.state.issueNumber });
      modifyIssue({ ...newIssue, issueNumber: this.state.issueNumber });
    }

    this.$element.close();
  });
}

export default Modal;
