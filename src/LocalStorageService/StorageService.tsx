
export const storeUserInfo =  (value: string) => localStorage.setItem("gmo-user", value);
export const getUserInfo = () => localStorage.getItem("gmo-user");
export const removeUserInfo = () => localStorage.removeItem("gmo-user");

