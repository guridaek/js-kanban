export const LOCAL_STORAGE_KEYS = {
  NEXT_NUMBER: "nextNumbers",
  ISSUE_LIST: "issueList",
};

export function updateNextNumber(updatedNumber) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER, updatedNumber.toString());
}

export function updateIssueList({ toDoList, inProgressList, doneList }) {
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.ISSUE_LIST,
    JSON.stringify({ toDoList, inProgressList, doneList })
  );
}

export function getIssueList() {
  try {
    const nextNumber = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER));
    const { toDoList, inProgressList, doneList } = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ISSUE_LIST)
    );
    return {
      nextNumber: nextNumber,
      toDoList: toDoList || [],
      inProgressList: inProgressList || [],
      doneList: doneList || [],
    };
  } catch {
    console.error("로컬 스토리지에서 목록을 불러오지 못했습니다.");

    return {
      nextNumber: 0,
      toDoList: [],
      inProgressList: [],
      doneList: [],
    };
  }
}
