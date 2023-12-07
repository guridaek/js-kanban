import "./Modal.css";

function Modal({ $target, handleClickConfirm }) {
  this.$element = document.createElement("dialog");
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <form class="modal">
        <h2>항목 추가/수정</h2>
        <label>이슈 제목<input id="issue-title" placeholder="이슈 제목을 입력해주세요" /></label>
        <label>담당자 id<input id="manager-id" placeholder="담당자 id를 입력해주세요" /></label>
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
    handleClickConfirm();

    this.$element.close();
  });
}

export default Modal;
