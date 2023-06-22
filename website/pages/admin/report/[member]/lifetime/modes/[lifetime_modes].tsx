import { GetServerSideProps } from 'next';
import ENV from '@website/core/env';
import {
  ReportPage,
  ReportPageSeasonProps,
} from '@website/pages/admin/report/[member]/season/[season]/modes/[modes]';
import {
  getDestinyModeGroups,
  getDestinySeasons,
  getNetworkRoster,
} from '@levelcrush/service-destiny';

export const getServerSideProps: GetServerSideProps<
  ReportPageSeasonProps
> = async (context) => {
  // fetch our network roster, seasons, destiny game mode groupings
  const [roster, seasons, modes] = await Promise.all([
    getNetworkRoster(ENV.hosts.destiny),
    getDestinySeasons(ENV.hosts.destiny),
    getDestinyModeGroups(ENV.hosts.destiny, 'dashboard'),
  ]);

  console.log('Modes here', context.query.lifetime_modes);
  return {
    props: {
      seasons: seasons,
      member: context.query.member as string,
      target_season: 'lifetime',
      target_mode: (context.query.lifetime_modes as string) || 'all',
      modes: modes,
      roster: roster,
    },
  };
};

export default ReportPage;