const user = sessionStorage.getItem('user');
const initialState = JSON.parse(user) || {};

function reducer(state = initialState, action) {
  let nextState = { ...state };

  switch (action.type) {
    case 'RECEIVE_USER':
      nextState.isAuthenticated = false;
      if (action.user && action.user.google) {
        nextState = {
          ...action.user,
          isAuthenticated: true
        };
      }
      break;
  }

  sessionStorage.setItem('user', JSON.stringify(nextState));
  return nextState;
}

export default reducer;
