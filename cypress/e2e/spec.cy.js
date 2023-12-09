import mockData from "../fixtures/issueList.json";
import { LOCAL_STORAGE_KEYS } from "../../src/data/handler";

describe("칸반 보드를 테스트한다", () => {
  beforeEach(() => {
    const size =
      mockData.toDoList.length + mockData.inProgressList.length + mockData.doneList.length;

    localStorage.setItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER, size.toString());
    localStorage.setItem(LOCAL_STORAGE_KEYS.ISSUE_LIST, JSON.stringify(mockData));

    cy.visit("/");
  });

  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ISSUE_LIST);
  });

  it("칸반 보드를 렌더링한다", () => {
    cy.contains(mockData.toDoList[0].issueNumber).should("be.visible");
    cy.contains(mockData.inProgressList[1].issueNumber).should("be.visible");
    cy.contains(mockData.doneList[2].issueNumber).should("be.visible");
  });

  it("이슈를 추가한다", () => {
    cy.get('button[class="addIssue"]:first').click();

    cy.get('input[id="issueTitle"]').type("추가된 이슈");
    cy.get('input[id="managerId"]').type("담당자 이름");
    cy.get('button[id="confirm"]').click();

    cy.contains("추가된 이슈").should("be.visible");
  });

  it("이슈를 제거한다", () => {
    cy.get('[data-issue-number="ISSUE-003"] > :nth-child(1) > div > #removeButton').click();

    cy.contains(mockData.inProgressList[0].issueNumber).should("not.exist");
  });

  it("이슈를 수정한다", () => {
    cy.get('[data-issue-number="ISSUE-003"] > :nth-child(1) > div > #modifyButton').click();

    cy.get('input[id="issueTitle"]').clear();
    cy.get('input[id="issueTitle"]').type("수정된 이슈");
    cy.get('input[id="managerId"]').type("담당자 이름");
    cy.get('button[id="confirm"]').click();

    cy.contains("수정된 이슈").should("be.visible");
  });

  it("이슈 추가 및 수정은 제목과 담당자 ID를 입력해야한다", () => {
    cy.get('button[class="addIssue"]:first').click();

    cy.get('input[id="issueTitle"]').type("추가된 이슈");
    cy.get('button[id="confirm"]').click();

    cy.contains("필수 값입니다").should("be.visible");
  });
});
