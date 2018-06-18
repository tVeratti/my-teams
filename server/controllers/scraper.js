var request = require('request');
var Nightmare = require('nightmare');
var nightmare = new Nightmare({ show: true });

var Team = require('./../models/Team');
var Game = require('./../models/Game');

var url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
var sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
var sel_TEAM = '.myss_view_col_standings_team';
var sel_COOKIE = '.btn-primary[name=go]';
var sel_SCHEDULE = '.myss_view_seasonlist a:nth-child(3)';
var sel_PAGE = '.pagination a';
var sel_SCHEDULE_ROW =
  '#myss_scheduleviewlist .myss_gridRow,' +
  '#myss_scheduleviewlist .myss_gridAltRow';

module.exports = app => {
  app.get('/scrape/teams', (req, res) => {
    request(url, (error, response, html) => {
      if (error || response.statusCode != 200) return;

      nightmare
        .goto(url)
        .wait(sel_LEAGUE)
        .click(sel_LEAGUE)
        .wait(sel_COOKIE)
        .click(sel_COOKIE)
        // Get teams
        .wait(sel_TEAM)
        .evaluate(scrapeTeams, sel_TEAM)
        .evaluate(upsertTeams)
        // Get schedule
        .click(sel_SCHEDULE)
        .wait(sel_PAGE)
        .evaluate(scrapeSchedule, sel_PAGE, sel_SCHEDULE_ROW)
        .evaluate(upsertGames)
        .end();
    });
  });
};

function scrapeTeams(sel_TEAM) {
  console.log('scrape: teams');
  var teams = [];
  document.querySelectorAll(sel_TEAM).forEach(t => teams.push(t.innerText));
  return teams;
}

function upsertTeams(teams) {
  console.log('upsert: teams');
  teams.forEach(name => {
    var query = { name };
    Team.findOneAndUpdate(query, query, { upsert: true });
  });
}

function scrapeSchedule(sel_PAGE, sel_SCHEDULE_ROW) {
  console.log('scrape: schedule');
  document.querySelectorAll(sel_PAGE).forEach((page, i) => {
    // Click through each page and collect all games.
    return nightmare
      .click(sel_PAGE + ':nth-child(' + (i + 1) + ') a')
      .wait(sel_SCHEDULE_ROW)
      .evaluate(scrapeGames, sel_SCHEDULE_ROW);
  });
}

function scrapeGames(sel_SCHEDULE_ROW) {
  var games = [];
  document.querySelectorAll(sel_SCHEDULE_ROW).forEach((row, i) => {
    console.log('scrape: games', i);
    var columns = row.querySelectorAll('td').map(e => e.innerText);

    games.push({
      index: i,
      date: columns[1],
      time: columns[3],
      home: columns[5],
      away: columns[6],
      status: columns[7]
    });
  });

  return games;
}

function upsertGames(games) {
  console.log('upsert: games');
  games.forEach(game => {
    var query = { index: game.index };
    Game.findOneAndUpdate(query, game, { upsert: true });
  });
}
