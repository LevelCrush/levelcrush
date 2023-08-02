import Head from 'next/head';
import React from 'react';
import { H1, H2 } from '../components/elements/headings';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetStaticProps } from 'next';
import BlockList from '../components/block_list';

interface HomeProps {
  youtubeID: string;
  events: any[];
  blocks: any[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      youtubeID: '5FNd-W7iEAU',
      events: [],
      blocks: [],
    },
  };
};

export const HomePage = (props: HomeProps) => (
  <div className="flex min-h-screen flex-wrap">
    {/* Left Column */}
    <div
      className="flex-auto w-full md:w-2/4 min-h-screen flex px-4 justify-center overflow-hidden max-w-[60rem]"
      style={{
        backgroundImage:
          "linear-gradient(to top,rgba(14,28,28,.85), rgba(14,14,28,.85)), url('./hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center left',
      }}
    >
      <div className="flex flex-col">
        <H1 className="flex-start  self-start basis-auto inline-block">
          Level Crush
        </H1>
        <H2 className="flex-start  self-start w-full relative top-0 left-0">
          <span className="float-left relative left-2">We just game.</span>
          <div className="inline-block float-right">
            <a
              href="https://discord.gg/kwgrVT2"
              target="_blank"
              title="Join us on Discord!"
              className="text-white opacity-70 hover:opacity-100 mr-12"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a
              href="https://github.com/levelcrush"
              title="Check out our github repositories"
              target="_blank"
              className="text-white opacity-70 hover:opacity-100 relative right-4"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div className="clear-both"></div>
        </H2>
      </div>
    </div>
    {/* Right Column */}
    <div className="flex-auto w-full md:w-2/4 min-h-screen flex flex-col">
      <iframe
        id="youtubePlayer"
        width="1920"
        height="540"
        className="w-full lg:h-[50vh]  xl:min-h-[33.75rem] flex-shrink-0 flex-grow-0 basis-auto"
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
            url_background: '',
          },
          {
            text: 'Diablo 4',
            caption: 'Diablo 4 Clan/Tools',
            url_background: '',
          },
          {
            text: 'Minecraft',
            caption: 'Minecraft Server Information',
            url_background: '',
          },
          {
            text: 'Satisfactory',
            caption: 'Satisfactory Server Information',
            url_background: '',
          },
        ]}
        id={'priorityBlockList'}
      />
    </div>
  </div>
);

export default HomePage;
