const { groupBy, uniq } = require('lodash');

const groupTeamsBySeason = (allGames, season) => {
  const teamsBySeason = [];

  const home = groupBy(allGames, 'home');
  const away = groupBy(allGames, 'away');

  const teams = [];
  const teamNames = uniq([...Object.keys(home), ...Object.keys(away)]);
  teamNames.forEach(name => {
    const homeGames = home[name] || [];
    const awayGames = away[name] || [];
    teams.push({
      name,
      season,
      id: `${season}_${name}`,
      games: [...homeGames, ...awayGames]
    });
  });

  teamsBySeason.push({ season, teams });

  return teamsBySeason;
};

module.exports = { groupTeamsBySeason };
