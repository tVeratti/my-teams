var Nightmare = require('nightmare');
var nightmare = new Nightmare({ show: true, waitTimeout: 15000 });

var Team = require('./../models/Team');
var Game = require('./../models/Game');

var url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
var sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
var sel_TEAM = '.myss_view_col_standings_team';
var sel_COOKIE = '.btn-primary[name=go]';
var sel_SCHEDULE = '.myss_view_seasonlist a:nth-child(3)';
var sel_PAGE = '.pagination li';
var sel_SCHEDULE_TABLE = '#myss_scheduleviewlist';
var sel_SCHEDULE_ROW =
  '#myss_scheduleviewlist .myss_gridRow,' +
  '#myss_scheduleviewlist .myss_gridAltRow';

module.exports = app => {
  app.get('/scrape/teams', (req, res) => {
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
      .then(x => res.json(x))
      .catch(console.error);
  });

  app.get('/scrape/games', (req, res) => {
    // Delete all existing games before scraping
    // the entire current schedule.
    Game.collection.drop();

    nightmare
      .goto(url)
      .wait(sel_LEAGUE)
      .click(sel_LEAGUE)
      .wait(sel_COOKIE)
      .click(sel_COOKIE)
      .click(sel_SCHEDULE)
      .wait(sel_PAGE)
      .evaluate(scrapePages, sel_PAGE)
      .then(maxPages => getPageGames(1, maxPages))
      .then(x => res.json(x))
      .catch(console.error);
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

function scrapePages(sel_PAGE) {
  return document.querySelectorAll(sel_PAGE).length;
}

function getPageGames(i, max) {
  if (i > max) return nightmare.end();
  var pageSelector = sel_PAGE + ':nth-child(' + i + ') a';
  nightmare
    .wait(pageSelector)
    .click(pageSelector)
    .wait(sel_SCHEDULE_TABLE)
    .evaluate(scrapeGames, sel_SCHEDULE_ROW)
    .then(upsertGames)
    .then(() => getPageGames(i + 1, max));
}

function scrapeGames(sel_SCHEDULE_ROW) {
  var games = [];
  document.querySelectorAll(sel_SCHEDULE_ROW).forEach((row, i) => {
    // Get column value inner text for quick reference.
    var columns = [];
    row.querySelectorAll('td').forEach(td => columns.push(td.innerText));

    // Clean scores out from completed games.
    var clean = name => name.replace(/(^\d*-)/, '');

    games.push({
      date: columns[1],
      time: columns[3],
      home: clean(columns[5]),
      away: clean(columns[6]),
      status: columns[7]
    });
  });

  return games;
}

function upsertGames(games) {
  Game.collection.insert(games);
}
