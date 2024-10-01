export const getAllDays = () => {
  return fetch("http://localhost:8088/days").then((res) => res.json());
};
