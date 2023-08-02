import React from 'react';
import { H3 } from './elements/headings';

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
        className="flex-1 basis-2/4 flex justify-center items-center"
        key={props.id + '_' + itemIndex}
        style={{
          backgroundImage:
            "linear-gradient(to top,rgba(14,28,28,.85), rgba(14,14,28,.85)), url('" +
            item.url_background +
            "')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <H3>{item.text}</H3>
      </div>
    ))}
  </div>
);

export default BlockList;
