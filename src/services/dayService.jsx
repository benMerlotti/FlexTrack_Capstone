export const getAllDays = () => {
  return fetch("http://localhost:3000/days").then((res) => res.json());
};
