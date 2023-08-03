import { useEffect, useState } from 'react';
import { H4 } from './elements/headings';

/**
 * Only a subset fields that we care about from the below source
 * https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event
 */
export interface DiscordEvent {
  id: string;
  guild_id: string;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  status: number;
  user_count?: number;
  image?: string;
}

export interface DiscordEventListProps {
  id: string;
  events: DiscordEvent[];
  className?: string;
}

const EVENT_STYLES = [
  'bg-[rgb(6,172,167)] border-[rgb(19,255,239)]',
  'bg-[rgb(172,63,6)] border-[rgb(255,161,19)]',
  'bg-[rgb(29,48,216)] border-[rgb(19,174,255)]',
];

type EventTimeMap = { [id: string]: string };

export const DiscordEventList = (props: DiscordEventListProps) => {
  const [eventTimes, setEventTimes] = useState({} as { [id: string]: string });

  useEffect(() => {
    const timeMap = {} as EventTimeMap;

    // loop through each discord event and parse to local time
    props.events.forEach((event) => {
      const date = new Date(event.scheduled_start_time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const event_date =
        month.toString().padStart(2, '0') +
        '/' +
        day.toString().padStart(2, '0') +
        '/' +
        year +
        ' ' +
        date.toLocaleTimeString();
      timeMap[event.id] = event_date;
    });

    setEventTimes(timeMap);
  }, [props.events]);

  return (
    <div className={props.className || ''}>
      {props.events.map((event, eventIndex) => (
        <div
          className={
            'flex w-full px-4 py-4 my-8 ' +
            EVENT_STYLES[eventIndex % EVENT_STYLES.length]
          }
          key={props.id + '_event_' + eventIndex}
        >
          <h4 className="text-2xl flex-1 justify-self-start">{event.name}</h4>
          <span className="text-xl flex 1 justify-self-end text-right">
            {typeof eventTimes[event.id] !== 'undefined'
              ? eventTimes[event.id]
              : ''}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DiscordEventList;
