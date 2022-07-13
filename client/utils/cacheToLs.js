import axios from "axios";

export const cacheToLocalStorage = async (url) => {
  if (localStorage[`safekeep@${url}`]) {
    return localStorage[`safekeep@${url}`];
  }
  const result = await axios.get(`${url}`);
  //localStorage.setItem(`safekeep@${url}`, result);
  console.log(result, "result here");
  return result;
};
