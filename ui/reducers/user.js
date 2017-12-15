const user = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
    console.log('obj in red: ', action.obj)
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
}

export default user;
