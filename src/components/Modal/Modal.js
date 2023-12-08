import "./Modal.css";

function Modal({ $target, addIssue }) {
  this.$element = document.createElement("dialog");
  $target.appendChild(this.$element);

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

  this.$element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) this.$element.close();
  });

  this.$element.querySelector("#cancel").addEventListener("click", () => {
    this.$element.close();
  });

  this.$element.querySelector("#confirm").addEventListener("click", () => {
    addIssue({
      title: this.$element.querySelector("#issueTitle").value,
      managerId: this.$element.querySelector("#managerId").value,
    });

    this.$element.close();
  });
}

export default Modal;
