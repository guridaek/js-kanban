const LOCAL_STORAGE_KEYS = {
  NEXT_NUMBER: "nextNumbers",
  ISSUE_LIST: "issueList",
};

export const updateNextNumber = (updatedNumber) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER, updatedNumber.toString());
};

export const updateIssueList = (updatedList) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ISSUE_LIST, JSON.stringify(structuredClone(updatedList)));
};

export const getIssueList = () => {
  try {
    const nextNumber = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.NEXT_NUMBER));
    const issueList = structuredClone(
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ISSUE_LIST))
    );

    if (!nextNumber | !issueList) throw new Error();

    return {
      nextNumber: nextNumber,
      issueList: issueList,
    };
  } catch {
    console.error("로컬 스토리지에서 목록을 불러오지 못했습니다.");

    return {
      nextNumber: 0,
      issueList: [],
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
