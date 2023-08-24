import Head from 'next/head';
import React from 'react';
import { H1, H2, H3 } from '../components/elements/headings';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import BlockList from '../components/block_list';
import DiscordEventList, { DiscordEvent } from '../components/event_list';
import DiscordLink from '../components/discord_link';
import OffCanvas, { OffCanvasToggle } from '../components/offcanvas';
import SiteHeader from '../components/site_header';
import DiscordConfig from '../config/discord';
import { YouTubeConfig } from '../config/youtube';
import Container from '../components/elements/container';
import Hero from '../components/hero';
import { ClanCard } from '../components/clan_cards';

interface DestinyProps {
  youtubeID: string;
}

export const getStaticProps: GetStaticProps<DestinyProps> = async () => {
  const youtubeID = YouTubeConfig.playlistIDHome;

  return {
    props: {
      youtubeID,
    },
  };
};

export const DestinyPage = (props: DestinyProps) => (
  <OffCanvas>
    <Head>
      <title>Destiny | Level Crush</title>
    </Head>
    <SiteHeader />
    <main>
      <Hero
        className="min-h-[40rem] overflow-hidden top-0 relative"
        youtubeID={props.youtubeID}
      />
      <Container>
        <H2>Clans in our Network</H2>
        <div className="flex flex-wrap justify-between gap-16 mt-8">
          <ClanCard
            name="Level Crush"
            callsign="LC"
            background_url="/clans/levelcrush_background.png"
            flag_url="/clans/levelcrush_flag.png"
            link_url="https://www.bungie.net/en/ClanV2?groupid=4356849"
          />
          <ClanCard
            name="Level Stomp"
            callsign="LS"
            background_url="/clans/levelstomp_background.png"
            flag_url="/clans/levelstomp_flag.png"
            link_url="https://www.bungie.net/en/ClanV2?groupid=4250497"
          />
          <ClanCard
            name="Righteous Indiggnation"
            callsign="+++"
            background_url="/clans/righteousindiggnation_background.png"
            flag_url="/clans/righteousindiggnation_flag.png"
            link_url="https://www.bungie.net/en/ClanV2?groupid=5108335"
          />
        </div>
      </Container>
    </main>
  </OffCanvas>
);

export default DestinyPage;