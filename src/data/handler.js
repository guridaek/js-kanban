export const LOCAL_STORAGE_KEYS = {
  NEXT_NUMBER: "nextNumbers",
  ISSUE_LIST: "issueList",
};

export const updateNextNumber = (updatedNumber) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER, updatedNumber.toString());
};

export const updateIssueList = ({ toDoList, inProgressList, doneList }) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.ISSUE_LIST,
    JSON.stringify({ toDoList, inProgressList, doneList })
  );
};

export const getIssueList = () => {
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
};

export const formatDate = (date) => {
  const target = new Date(date);

  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, "0");
  const day = String(target.getDate()).padStart(2, "0");
  const hours = String(target.getHours()).padStart(2, "0");
  const minutes = String(target.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
