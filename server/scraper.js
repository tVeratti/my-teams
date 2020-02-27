const Nightmare = require('nightmare');

let nightmare;

const url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
const sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
const sel_COOKIE = '.btn-primary[name=go]';
const sel_SCHEDULE = '.myss_view_seasonlist a:nth-child(3)';
const sel_PAGE = '.pagination li';
const sel_SCHEDULE_TABLE = '#myss_scheduleviewlist';
const sel_SCHEDULE_ROW =
  '#myss_scheduleviewlist .myss_gridRow,' +
  '#myss_scheduleviewlist .myss_gridAltRow';

nightmare = new Nightmare({ show: true, waitTimeout: 15000 });
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
  .then(() =>
    callback(null, {
      statusCode: 200,
      body: 'Scrape complete!'
    })
  )
  .catch(console.error);

function scrapePages(sel_PAGE) {
  return document.querySelectorAll(sel_PAGE).length;
}

function getPageGames(max, i) {
  i = i || 1;
  if (i > max) {
    return nightmare.end();
  }

  // Click this page and let the table load
  // newly paginated date, then scrape those games
  // and insert into MongoD.
  const pageSelector = sel_PAGE + ':nth-child(' + i + ') a';
  nightmare
    .wait(pageSelector)
    .click(pageSelector)
    .wait(sel_SCHEDULE_TABLE)
    .evaluate(scrapeGames, sel_SCHEDULE_ROW)
    .then(newGames => console.log(newGames))
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
