import "./Modal.css";

function Modal({ $target, addIssue, modifyIssue }) {
  this.$element = document.createElement("dialog");
  $target.appendChild(this.$element);

  this.state = {
    action: "add",
    issueNumber: null,
    status: null,
  };

  this.setState = ({ action, issueNumber, status }) => {
    this.state = {
      action: action,
      issueNumber: action === "modify" ? issueNumber : null,
      status: status,
    };
  };

  this.render = () => {
    this.$element.innerHTML = `
      <form class="modal">
        <h2>항목 추가/수정</h2>
        <label
          >이슈 제목<input id="issueTitle" placeholder="이슈 제목을 입력해주세요" />
          <p id="issueTitleError" class="errorMessage hide">이슈 제목은 필수 값입니다.</p></label
        >

        <label
          >담당자 id<input id="managerId" placeholder="담당자 id를 입력해주세요" />
          <p id="managerIdError" class="errorMessage hide">담당자 id는 필수 값입니다.</p></label
        >

        <div class="buttonContainer">
          <button id="cancel" type="reset">취소</button>
          <button id="confirm" type="reset">확인</button>
        </div>
      </form>
    `;
  };

  this.render();

  this.open = ({ action, issueNumber, title, managerId, status }) => {
    this.setState({ action, issueNumber, status });

    if (title) this.$element.querySelector("#issueTitle").value = title;
    if (managerId) this.$element.querySelector("#managerId").value = managerId;

    this.$element.showModal();
  };

  this.close = () => {
    this.$element.close();

    this.$element.querySelector("#issueTitle").classList.remove("error");
    this.$element.querySelector("#managerId").classList.remove("error");
    this.$element.querySelector(".modal").reset();
  };

  this.$element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) this.close();
  });

  this.$element.querySelector("#cancel").addEventListener("click", () => {
    this.close();
  });

  this.$element.querySelector("#confirm").addEventListener("click", (e) => {
    const newIssue = {
      title: this.$element.querySelector("#issueTitle").value,
      managerId: this.$element.querySelector("#managerId").value,
    };

    if (newIssue.title.trim() === "") {
      this.$element.querySelector("#issueTitle").classList.add("error");

      e.preventDefault();
      return;
    }

    if (newIssue.managerId.trim() === "") {
      this.$element.querySelector("#managerId").classList.add("error");

      e.preventDefault();
      return;
    }

    if (this.state.action === "add") {
      addIssue(newIssue);
    }

    if (this.state.action === "modify") {
      modifyIssue({ ...newIssue, issueNumber: this.state.issueNumber, status: this.state.status });
    }

    this.close();
  });
}

export default Modal;
