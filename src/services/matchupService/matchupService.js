// import { getMatchups } from "../sleeperService";

export const getSingleSeasonMatchups = async (leagueId, rosterId) => {
  // cria um array de 14 posições contendo as urls de cada semana
  const weeksUrls = Array.from(
    { length: 14 },
    (_, i) =>
      `https://api.sleeper.app/v1/league/1048755953828605952/matchups/${i + 1}`,
  );

  const response = weeksUrls.map((url) => fetch(url).then((res) => res.json()));

  const responseData = await Promise.all(response);

  const matchups = responseData.map((result) => {
    const matchupId = result.find((data) => data.roster_id === 6).matchup_id; // retorna cada matchup_id do time em questão
    const arr = [];
    // coloca os dois matchups com matchup_id iguais dentro de um array
    result.forEach((a) => {
      if (a.matchup_id === matchupId) {
        arr.push(a);
      }
    });
    return arr;
  });

  return matchups;
};
