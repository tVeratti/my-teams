var request = require('request');
var Nightmare = require('nightmare');
var nightmare = new Nightmare({ show: false });

const Team = require('./../models/Team');

var url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
var sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
var sel_TEAM = '.myss_view_col_standings_team';
var sel_COOKIE = '.btn-primary[name=go]';

module.exports = app => {
  app.get('/scrape/teams', (req, res) => {
    request(url, (error, response, html) => {
      if (error || response.statusCode != 200) return;

      console.log('get-teams', url);

      nightmare
        .goto(url)
        .wait(sel_LEAGUE)
        .click(sel_LEAGUE)
        .wait(sel_COOKIE)
        .click(sel_COOKIE)
        .wait(sel_TEAM)
        .evaluate(scrapeTeams, sel_TEAM)
        .end()
        .then(upsertTeams)
        .then(() => res.json('done'));
    });
  });
};

function scrapeTeams(sel_TEAM) {
  var teams = [];
  document.querySelectorAll(sel_TEAM).forEach(t => teams.push(t.innerText));
  return teams;
}

function upsertTeams(teams) {
  teams.forEach(name => {
    var query = { name };
    Team.findOneAndUpdate(query, query, { upsert: true });
  });
}
