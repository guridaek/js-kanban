import "./Modal.css";

function Modal({ $target }) {
  this.$element = document.createElement("dialog");
  this.$element.className = "modal";
  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
      <h2>항목 추가/수정</h2>
      <label>이슈 제목<input id="issue-title" placeholder="이슈 제목을 입력해주세요" /></label>
      <label>담당자 id<input id="manager-id" placeholder="담당자 id를 입력해주세요" /></label>
      <div class="buttonContainer">
      <button>취소</button>
      <button>확인</button>
      </div>
    `;
  };

  this.render();
}

export default Modal;
