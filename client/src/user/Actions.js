import xhr from 'xhr';
import { uniq } from 'lodash';

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
  },

  modifyTeams: function(team, action = 'add') {
    return (dispatch, getState) => {
      let { teams } = getState().user;
      if (action === 'add') teams.push(team);
      else teams = teams.filter(t => t !== team);
      teams = uniq(teams);

      xhr.post(
        { uri: '/api/user/teams', body: { teams }, json: true },
        (err, res, doc) => {
          console.log(doc);
          dispatch({ type: 'MODIFY_TEAMS', teams });
        }
      );
    };
  }
};
