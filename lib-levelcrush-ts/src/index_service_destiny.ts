import type { APIResponse } from "./index_server";
import type { MemberResponse } from "./service-destiny/MemberResponse";

export * from "./service-destiny/ClanInformation";
export * from "./service-destiny/ClanResponse";
export * from "./service-destiny/MemberClanInformation";
export * from "./service-destiny/MemberReport";
export * from "./service-destiny/MemberReportActivity";
export * from "./service-destiny/MemberReportActivityMode";
export * from "./service-destiny/MemberReportFireteamMember";
export * from "./service-destiny/MemberTitle";
export * from "./service-destiny/MemberTitleResponse";
export * from "./service-destiny/MemberReportStats";
export * from "./service-destiny/ReportOutput";
export * from "./service-destiny/MemberResponse";

/**
 * Intended to represent combinations of the the enumeration "DestinyActivityModeType".
 *
 * [Bungie Documentation](https://bungie-net.github.io/#/components/schemas/Destiny.HistoricalStats.Definitions.DestinyActivityModeType)
 */
export interface DestinyActivityModeGroup {
  name: string;
  value: string;
}

/**
 * Calls the the level crush dest iny service and fetches the network roster
 * @param host Where the level crush destiny service lives
 * @returns
 */
export async function getNetworkRoster(host: string) {
  const destiny_api = host;
  const response = await fetch(destiny_api + "/network/roster");

  const network_roster = response.ok
    ? ((await response.json()) as APIResponse<MemberResponse[]>)
    : null;

  return network_roster && network_roster.response !== null
    ? network_roster.response
    : [];
}

/**
 * Gets the destiny seasons
 * @param host Where the destiny service lives.
 * @returns An array of  numbers that represent the seasons in destiny
 */
export async function getDestinySeasons(host: string) {
  let seasons = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  seasons.sort((a, b) => b - a);
  seasons = [0].concat(seasons);
  return seasons;
}

/**
 * Gets our chosen groupings
 * @param host
 * @returns
 */
export async function getDestinyModeGroups(host: string) {
  const modes = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Raid",
      value: "4",
    },
  ] as DestinyActivityModeGroup[];
  return modes;
}