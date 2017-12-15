const user = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
}

export default user;
