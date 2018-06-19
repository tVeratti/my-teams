var Nightmare = require('nightmare');
var nightmare;

var Team = require('./../models/Team');
var Game = require('./../models/Game');

var url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
var sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
var sel_COOKIE = '.btn-primary[name=go]';
var sel_SCHEDULE = '.myss_view_seasonlist a:nth-child(3)';
var sel_PAGE = '.pagination li';
var sel_SCHEDULE_TABLE = '#myss_scheduleviewlist';
var sel_SCHEDULE_ROW =
  '#myss_scheduleviewlist .myss_gridRow,' +
  '#myss_scheduleviewlist .myss_gridAltRow';

module.exports = app => {
  app.get('/scrape/games', (req, res) => {
    // Delete all existing games before scraping
    // the entire current schedule.
    Game.remove().exec();

    nightmare = new Nightmare({ show: false, waitTimeout: 15000 });
    nightmare
      .goto(url)
      .wait(sel_LEAGUE)
      .click(sel_LEAGUE)
      .wait(sel_COOKIE)
      .click(sel_COOKIE)
      .click(sel_SCHEDULE)
      .wait(sel_PAGE)
      .evaluate(scrapePages, sel_PAGE)
      .then(getPageGames)
      .then(() => res.json('done'))
      .catch(console.error);
  });
};

function scrapePages(sel_PAGE) {
  return document.querySelectorAll(sel_PAGE).length;
}

function getPageGames(max, i) {
  i = i || 1;
  if (i > max) return nightmare.end();

  // Click this page and let the table load
  // newly paginated date, then scrape those games
  // and insert into MongoD.
  var pageSelector = sel_PAGE + ':nth-child(' + i + ') a';
  nightmare
    .wait(pageSelector)
    .click(pageSelector)
    .wait(sel_SCHEDULE_TABLE)
    .evaluate(scrapeGames, sel_SCHEDULE_ROW)
    .then(insertGames)
    .then(() => getPageGames(max, i + 1));
}

function scrapeGames(sel_SCHEDULE_ROW) {
  var games = [];
  document.querySelectorAll(sel_SCHEDULE_ROW).forEach((row, i) => {
    // Get column value inner text for quick reference.
    var columns = [];
    row.querySelectorAll('td').forEach(td => columns.push(td.innerText.trim()));

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

function insertGames(games) {
  Game.collection.insert(games);
}
