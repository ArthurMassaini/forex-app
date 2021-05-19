export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const clearUser = () => localStorage.removeItem('user');
