var co = require('co');
var Nightmare = require('nightmare');

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
  app.get('/scrape/teams', co.wrap(function*(req, res) {
    console.log('/scrape/teams');
      run();
    // nightmare
    //   .goto(url)
    //   .wait(sel_LEAGUE)
    //   .click(sel_LEAGUE)
    //   .wait(sel_COOKIE)
    //   .click(sel_COOKIE)
    //   // Get teams
    //   .wait(sel_TEAM)
    //   .evaluate(scrapeTeams, sel_TEAM)
    //   .evaluate(upsertTeams)
    //   // Get schedule
    //   .click(sel_SCHEDULE)
    //   .wait(sel_PAGE)
    //   .evaluate(scrapeSchedule, sel_PAGE, sel_SCHEDULE_ROW)
    //   .evaluate(upsertGames)
    //   .end()
    //   .then(console.log)
    //   .catch(console.error);
  });
};

function* run() {
  var nightmare = new Nightmare({ show: false });
  var games = [];

  // Load base page.
  yield nightmare
    .goto(url)
    .wait(sel_LEAGUE)
    .click(sel_LEAGUE)
    .wait(sel_COOKIE)
    .click(sel_COOKIE)
    .click(sel_SCHEDULE)
    .wait(sel_PAGE);

  // Get pagination links
  var pages = yield nightmare.evaluate(scrapePages, sel_PAGE);

  // Click each page and scrape teams from each table.
  pages.forEach(p => {
    var pageGames = yield nightmare
    .click(sel_PAGE + ':nth-child(' + (i + 1) + ') a')
    .evaluate(scrapeGames, sel_SCHEDULE_ROW);
    games = games.concat(pageGames);
  });

  // Upsert games to Mongod and end nightmare.
  yield nightmare
    .evaluate(upsertGames)
    .end()
    .then(console.log)
    .catch(console.error);
}

function scrapeTeams(sel_TEAM) {
  console.log('scrape: teams');
  var teams = [];
  document.querySelectorAll(sel_TEAM).forEach(t => teams.push(t.innerText));
  return teams;
}

function upsertTeams(teams) {
  console.log('upsert: teams', teams);
  // teams.forEach(name => {
  //   var query = { name };
  //   Team.findOneAndUpdate(query, query, { upsert: true });
  // });
}

function scrapePages(sel_PAGE) {
  return document.querySelectorAll(sel_PAGE);
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
  console.log('upsert: games', games);
  // games.forEach(game => {
  //   var query = { index: game.index };
  //   Game.findOneAndUpdate(query, game, { upsert: true });
  // });
}
