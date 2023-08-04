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
] as RouteItem[];

export default Routes;
