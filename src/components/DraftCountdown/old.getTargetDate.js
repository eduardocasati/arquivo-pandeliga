import { getDraftDate } from '../../services/leagueService.js';

export async function getTargetDate() {
  const timestamp = await getDraftDate(); // Data em Unix epoch
  return new Date(timestamp);
}
