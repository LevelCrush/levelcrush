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

export const HomePage = () => (
  <OffCanvas>
    <Head>
      <title>Destiny | Level Crush</title>
    </Head>
    <SiteHeader />
  </OffCanvas>
);

export default HomePage;
