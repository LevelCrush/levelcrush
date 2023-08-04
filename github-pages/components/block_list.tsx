import React from 'react';
import { H3 } from './elements/headings';
import Button from './elements/button';

export interface BlockListItem {
  text: string;
  caption: string;
  url_background: string;
}

export interface BlockListProps {
  id: string;
  items: BlockListItem[];
  className?: string;
}

export const BlockList = (props: BlockListProps) => (
  <div className={'flex flex-wrap ' + (props.className || '')}>
    {props.items.map((item, itemIndex) => (
      <div
        title={item.caption}
        className="relative top-0 group flex-1 basis-2/4 flex justify-center items-center  min-h-[12.5rem] block-list-item text-center flex-wrap"
        key={props.id + '_' + itemIndex}
        style={
          {
            '--background': "url('" + (item.url_background || '') + "')",
          } as React.CSSProperties
        }
      >
        <H3 className=" z-10 basis-full lg:group-hover:opacity-0 opacity:100  ease-in-out duration-300 ">
          {item.text}
        </H3>
        <Button
          className=" z-10 absolute max-w-[10rem] lg:group-hover:opacity-100 opacity-100 lg:opacity-0 bottom-8 md:bottom-12  lg:bottom-auto"
          intention={'normal'}
        >
          Learn More
        </Button>
      </div>
    ))}
  </div>
);

export default BlockList;
