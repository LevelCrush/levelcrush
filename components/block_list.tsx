import React, { useState } from 'react';
import { H3 } from './elements/headings';
import Button, { HyperlinkButton } from './elements/button';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/router';

export interface BlockListItem {
  text: string;
  caption: string;
  url_background: string;
  url: string;
}

export interface BlockListProps {
  id: string;
  items: BlockListItem[];
  className?: string;
}

export const BlockList = (props: BlockListProps) => {
  const router = useRouter();

  return (
    <div className={twMerge('flex flex-wrap', props.className)}>
      {props.items.map((item, itemIndex) => (
        <div
          title={item.caption}
          className=" cursor-pointer block-list-item border-l-[1px] border-l-white border-r-[1px] border-r-white  border-b-[1px] border-b-white border-opacity-20 relative top-0 group flex-1 basis-2/4 flex justify-center items-center  min-h-[12rem] text-center flex-wrap overflow-hidden"
          key={props.id + '_' + itemIndex}
          onClick={(ev) => {
            router.push(item.url);
          }}
        >
          {item.url_background ? (
            <div
              className="z-0 block-list-item-image"
              style={
                {
                  '--background': "url('" + (item.url_background || '') + "')",
                } as React.CSSProperties
              }
            />
          ) : (
            <></>
          )}
          <H3 className=" z-10 basis-full lg:group-hover:opacity-0 opacity:100  ease-in-out duration-300 ">
            {item.text}
          </H3>
          <HyperlinkButton
            className=" absolute z-10 max-w-[10rem] lg:group-hover:opacity-100 opacity-100 lg:opacity-0 bottom-8 md:bottom-12  lg:bottom-auto"
            intention={'normal'}
            href={item.url}
          >
            Learn More
          </HyperlinkButton>
        </div>
      ))}
    </div>
  );
};

export default BlockList;