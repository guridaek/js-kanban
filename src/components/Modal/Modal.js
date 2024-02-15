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
        <label>
          이슈 제목<input id="issueTitle" placeholder="이슈 제목을 입력해주세요" />
          <p id="issueTitleError" class="errorMessage hide">이슈 제목은 필수 값입니다.</p>
        </label>

        <label>
          담당자 id<input id="managerId" placeholder="담당자 id를 입력해주세요" />
          <p id="managerIdError" class="errorMessage hide">담당자 id는 필수 값입니다.</p>
        </label>

        <div class="buttonContainer">
          <button id="cancel" type="button">취소</button>
          <button id="confirm" type="button">확인</button>
        </div>
      </form>
    `;
  };

  this.render();

  const showError = (element, shouldShow) => {
    element.classList.toggle("error", shouldShow);
  };

  const handleCancelButtonClick = () => {
    this.close();
  };

  const handleConfirmButtonClick = () => {
    const issueTitle = this.$element.querySelector("#issueTitle");
    const managerId = this.$element.querySelector("#managerId");

    showError(issueTitle, !issueTitle.value.trim());
    showError(managerId, !managerId.value.trim());

    if (!issueTitle.value.trim() || !managerId.value.trim()) {
      return;
    }

    const newIssue = {
      title: issueTitle.value,
      managerId: managerId.value,
    };

    if (this.state.action === "add") {
      addIssue(newIssue);
    }

    if (this.state.action === "modify") {
      modifyIssue({ ...newIssue, issueNumber: this.state.issueNumber, status: this.state.status });
    }

    this.close();
  };

  this.open = ({ action, issueNumber, title, managerId, status }) => {
    this.setState({ action, issueNumber, status });

    const issueTitle = this.$element.querySelector("#issueTitle");
    const managerIdInput = this.$element.querySelector("#managerId");

    issueTitle.value = title || "";
    managerIdInput.value = managerId || "";

    this.$element.showModal();
  };

  this.close = () => {
    this.$element.querySelector(".modal").reset();
    this.$element.close();

    ["#issueTitle", "#managerId"].forEach((selector) => {
      showError(this.$element.querySelector(selector), false);
    });
  };

  this.$element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      this.close();
    }
  });

  this.$element.addEventListener("click", (e) => {
    if (e.target.id === "cancel") {
      handleCancelButtonClick();
    }

    if (e.target.id === "confirm") {
      handleConfirmButtonClick();
    }
  });

  this.$element.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleConfirmButtonClick();
    }
  });
}

export default Modal;
