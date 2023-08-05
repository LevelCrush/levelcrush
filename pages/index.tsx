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

interface HomeProps {
  youtubeID: string;
  events: DiscordEvent[];
  blocks: any[];
}

/**
 * Calls the Discord Api and fetches the server events
 *
 * @returns An array of DiscordEvent
 */
async function getDiscordServerEvents() {
  const targetServer = DiscordConfig.targetServer;
  const discordBotToken = process.env['DISCORD_BOT_TOKEN'] || '';
  const endpoint =
    'https://discord.com/api/v10/guilds/' +
    encodeURIComponent(targetServer) +
    '/scheduled-events';

  // todo: the below code should be at some point tweaked to handle errors
  const apiRequest = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: 'Bot ' + discordBotToken,
    },
    next: {
      revalidate: 300,
    },
  });

  if (apiRequest.ok) {
    const response = (await apiRequest.json()) as DiscordEvent[];
    return response;
  }
  return [];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const youtubeID = YouTubeConfig.playlistIDHome;
  const events = await getDiscordServerEvents();

  return {
    props: {
      youtubeID,
      events,
      blocks: [],
    },
  };
};

export const HomePage = (props: HomeProps) => (
  <OffCanvas>
    <Head>
      <title>Homepage | Level Crush</title>
    </Head>
    <SiteHeader />
    <Container minimalCSS={true} className="lg:px-4 mx-auto">
      <div className="flex lg:min-h-screen flex-wrap relative top-0">
        {/* Left Column */}
        <div className="relative top-0 flex-auto w-full lg:w-2/4 lg:min-h-screen items-center self-start overflow-hidden lg:max-w-[60rem] flex-wrap">
          <DiscordEventList
            className="px-4 flex-start self-start w-full relative top-0 left-0 mt-0"
            events={props.events}
            id="discordEvents"
          />
        </div>
        {/* Right Column */}
        <div className="flex-auto self-start w-full lg:w-2/4 lg:min-h-screen flex flex-col lg:sticky top-0">
          <iframe
            id="youtubePlayer"
            width="1920"
            height="540"
            className="border-l-[1px] border-l-white border-b-[1px] border-b-white border-r-white border-r-[1px] border-opacity-20 w-full h-[13rem] md:h-[28rem] lg:h-[40vh] flex-shrink-0 flex-grow-0 basis-auto"
            src={
              'https://www.youtube-nocookie.com/embed/' +
              encodeURIComponent(props.youtubeID) +
              '?iv_load_policy=3&controls=0&autoplay=1&disablekb=1&fs=0&showinfo=0&rel=0&loop=1&playlist=' +
              encodeURIComponent(props.youtubeID) +
              '&modestbranding=1&playsinline=1&mute=1'
            }
            title="Embedded Inline Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          <BlockList
            className="flex-1"
            items={[
              {
                text: 'Destiny 2',
                caption: 'Destiny 2 Clans/Tools',
                url_background: '/covers/destiny2.jpg',
              },
              {
                text: 'Diablo 4',
                caption: 'Diablo 4 Clan/Tools',
                url_background: '/covers/diablo.jpg',
              },
              {
                text: 'Minecraft',
                caption: 'Minecraft Server Information',
                url_background: '/covers/minecraft.jpg',
              },
              {
                text: 'Satisfactory',
                caption: 'Satisfactory Server Information',
                url_background: '/covers/satisfactory.jpg',
              },
            ]}
            id={'priorityBlockList'}
          />
        </div>
      </div>
    </Container>
  </OffCanvas>
);

export default HomePage;
