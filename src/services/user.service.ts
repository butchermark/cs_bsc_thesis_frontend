export function getUser() {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  } else {
    throw new Error('User not found in localStorage');
  }
}
