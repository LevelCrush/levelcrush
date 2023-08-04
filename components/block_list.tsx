import React, { useState } from 'react';
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

export const BlockList = (props: BlockListProps) => {
  return (
    <div className={'flex content-start flex-wrap ' + (props.className || '')}>
      {props.items.map((item, itemIndex) => (
        <div
          title={item.caption}
          className="  gap-0 block-list-item  border-l-[1px] border-l-white border-t-[1px] border-t-white border-opacity-20 relative top-0 group flex-1 basis-2/4 flex justify-center items-center  h-[12.5rem] text-center flex-wrap overflow-hidden"
          key={props.id + '_' + itemIndex}
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
          <Button
            className=" absolute z-10 max-w-[10rem] lg:group-hover:opacity-100 opacity-100 lg:opacity-0 bottom-8 md:bottom-12  lg:bottom-auto"
            intention={'normal'}
          >
            Learn More
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
