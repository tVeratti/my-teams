require('dotenv').config();
const Nightmare = require('nightmare');
const MongoClient = require('mongodb').MongoClient;
const vo = require('vo');

let nightmare;

// Mongo Connection Config
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION } = process.env;
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION}`;
const options = { useNewUrlParser: true };

const url = 'http://kcdome.athletetrax.info/league-schedules/';

// Selectors
const sel_LEAGUE = '.myss_view_seasonlist:nth-child(7) a';
const sel_COOKIE = '.btn-primary[name=go]';
const sel_SEASON = '.myss_seasonlist_name b';
const sel_PAGE = '.pagination li';
const sel_SCHEDULE_TABLE = '#myss_scheduleviewlist';
const sel_SCHEDULE_ROW =
  '#myss_scheduleviewlist .myss_gridRow,' +
  '#myss_scheduleviewlist .myss_gridAltRow';

const run = async function() {
  const client = await MongoClient.connect(uri, options);
  if (!client) return;

  try {
    // Clear all games data before scraping all fresh.
    await client
      .db('my-teams')
      .collection('games')
      .deleteMany({});

    nightmare = new Nightmare({ show: true, waitTimeout: 5000 });

    const seasons = await nightmare
      .goto(url)
      .wait(sel_LEAGUE)
      .evaluate(scrapeSeasons, sel_SEASON);

    for (let i = 0; i < seasons.length; i++) {
      console.log(i);
      const season = seasons[i];
      // Get all games for each season schedule
      let scheduleSelector = i % 2 ? '.myss_gridRow' : '.myss_gridAltRow';
      scheduleSelector += `:nth-child(${i +
        2}) > .l:nth-child(6) a:first-child`;

      await nightmare
        .wait(scheduleSelector)
        .click(scheduleSelector)
        //.wait(sel_COOKIE)
        //.click(sel_COOKIE)
        .wait(sel_PAGE)
        .evaluate(scrapePages, sel_PAGE)
        .then(max => getPageGames(max, season))
        .then(games => {
          console.log('insert', games);
          client
            .db('my-teams')
            .collection('games')
            .insertMany(games);
        })
        .catch(console.log);

      await nightmare.click('.myss_view_seasonlist a');
    }
  } catch (err) {
    console.log(err);
  } finally {
    nightmare.end();
    client.close();
  }
};

function scrapeSeasons(sel_SEASON) {
  return [...document.querySelectorAll(sel_SEASON)].map(el => el.innerText);
}

function scrapePages(sel_PAGE) {
  return document.querySelectorAll(sel_PAGE).length;
}

function getSeasons() {}

async function getPageGames(max, season) {
  let games = [];
  // Click this page and let the table load
  // newly paginated date, then scrape those games
  // and insert into MongoD.
  for (let i = 1; i <= max; i++) {
    const pageSelector = sel_PAGE + ':nth-child(' + i + ') a';
    const pageGames = await nightmare
      .wait(pageSelector)
      .click(pageSelector)
      .wait(sel_SCHEDULE_TABLE)
      .evaluate(scrapeGames, sel_SCHEDULE_ROW, season);
    games = [...games, ...pageGames];
  }

  return games;
}

function scrapeGames(sel_SCHEDULE_ROW, season) {
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
      status: columns[7],
      season
    });
  });

  return games;
}

run();
