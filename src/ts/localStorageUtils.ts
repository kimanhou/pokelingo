const LOCAL_STORAGE_APP_NAME = "pokelingo";

const LAST_VISIT_KEY = `${LOCAL_STORAGE_APP_NAME}.lastVisit`;

export const setLastVisit = (date: Date) => {
    localStorage.setItem(LAST_VISIT_KEY, date.toDateString());
};

export const getLastVisit = () => {
    return localStorage.getItem(LAST_VISIT_KEY);
};
