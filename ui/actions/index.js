export const TEST = 'TEST';
export const LOGIN = 'LOGIN';

export const test = (obj) => ({
  type: TEST,
  obj
});

export const user = (obj) => ({
  type: LOGIN,
  obj
})
