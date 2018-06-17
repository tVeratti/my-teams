import xhr from 'xhr';

export default {
  fetchUser: function() {
    return dispatch => {
      xhr.get({ uri: '/api/user', json: true }, (err, res, user) => {
        dispatch(this.receiveUser(user));
      });
    };
  },
  receiveUser: function(user) {
    return { type: 'RECEIVE_USER', user };
  }
};
