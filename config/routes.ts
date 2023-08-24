export interface RouteItem {
  url: string;
  name: string;
  target?: '_blank' | '_self';
  children?: RouteItem[];
}

/** These are the standard routes, intended for top level site navigation  */
export const Routes = [
  {
    url: '/',
    name: 'Home',
    pullMenuOnly: true,
  },
  {
    url: 'https://discord.gg/kwgrVT2',
    name: 'Discord Server',
  },
  {
    url: '#DestinyClans',
    name: 'Destiny Clans',
    children: [
      {
        name: 'Level Crush',
        url: 'https://www.bungie.net/en/ClanV2?groupid=4356849',
      },
      {
        name: 'Level Stomp',
        url: 'https://www.bungie.net/en/ClanV2?groupid=4250497',
      },
      {
        name: 'Righteous Indiggnation',
        url: 'https://www.bungie.net/en/ClanV2?groupid=5108335',
      },
    ],
  },
  {
    url: '#DestinyTools',
    name: 'Destiny Tools',
    children: [
      {
        url: 'https://destinyitemmanager.com/en/',
        name: 'Destiny Item Manager',
      },
      {
        url: 'https://todayindestiny.com/',
        name: 'Today In Destiny',
      },
      {
        url: 'https://app.mobalytics.gg/destiny-2',
        name: 'Destiny 2 Mobalytics',
      },
      {
        url: 'https://destinyrecipes.com/',
        name: 'Destiny Recipes',
      },
      {
        url: 'https://d2armorpicker.com/',
        name: 'D2ArmorPicker',
      },
      {
        url: 'https://engram.blue/crafting',
        name: 'Engram.blue',
      },
    ],
  },
  {
    url: '#DiabloTools',
    name: 'Diablo Tools',
    children: [
      {
        url: 'https://d4builds.gg',
        name: 'D4 Builds',
      },
      {
        url: 'https://diablo4.life',
        name: 'Diablo4 Life',
      },
      {
        url: 'https://maxroll.gg/d4',
        name: 'Maxroll GG',
      },
    ],
  },
] as RouteItem[];

export default Routes;
