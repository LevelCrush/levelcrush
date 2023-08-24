import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ClanCardProps {
  name: string;
  callsign: string;
  background_url: string;
  flag_url: string;
  link_url: string;
  className?: string;
}

export const ClanCard = (props: ClanCardProps) => (
  <div className={twMerge('clan-card', props.className)}>
    <h3 className="font-headline text-3xl tracking-widest text-center bg-black border-white border-opacity-20 border-solid border-[1px] py-2">
      {props.name}
    </h3>
    <a
      className={
        'block relative top-0 left-0 overflow-hidden max-w-[20rem] h-[30rem] group border-white border-opacity-20 border-solid border-[1px] border-t-0'
      }
      href={props.link_url}
    >
      <img
        className="object-cover object-center w-full h-full blur-sm  group-hover:blur-0 transition-all duration-300 ease-in-out"
        src={props.background_url}
        alt={`${props.name} clan background`}
      />
      <img
        className="absolute top-0 w-full h-auto drop-shadow-2xl "
        src={props.flag_url}
        alt={`${props.flag_url} clan flag`}
      />
    </a>
  </div>
);
