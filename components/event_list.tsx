import { useEffect, useState } from 'react';
import { H4 } from './elements/headings';
import Button, { HyperlinkButton } from './elements/button';

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

type DiscordMinimumEvent = Partial<DiscordEvent> &
  Pick<DiscordEvent, 'id' | 'name'>;

export interface DiscordEventListProps {
  id: string;
  events: DiscordMinimumEvent[];
  className?: string;
}

const EVENT_STYLES = [
  'border-[rgb(19,255,239)]',
  'border-[rgb(255,161,19)]',
  'border-[rgb(19,174,255)]',
];

type EventTimeMap = { [id: string]: string };

export const DiscordEventList = (props: DiscordEventListProps) => {
  const [eventTimes, setEventTimes] = useState({} as { [id: string]: string });

  useEffect(() => {
    const timeMap = {} as EventTimeMap;

    // loop through each discord event and parse to local time
    props.events.forEach((event) => {
      if (event.scheduled_start_time) {
        const date = new Date(event.scheduled_start_time);

        let event_date =
          date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

        // probably a better way to do this, but it works for now
        // also probably only works for the en-us locale
        event_date = event_date.replace(':00 PM', ' PM');
        event_date = event_date.replace(':00 AM', ' AM');
        timeMap[event.id] = event_date;
      }
    });

    setEventTimes(timeMap);
  }, [props.events]);

  if (props.events.length === 0) {
    props.events.push({
      id: '-1',
      name: 'No Scheduled Events',
    });
  }

  return (
    <div className={props.className || ''}>
      {props.events.map((event, eventIndex) => (
        <div
          className={
            'bg-[#2b2c31]  group relative top-0 flex w-full mb-8 flex-wrap border-[1px] transition-all duration-300 ease-in-out border-opacity-20 hover:border-opacity-100 ' +
            EVENT_STYLES[eventIndex % EVENT_STYLES.length]
          }
          key={props.id + '_event_' + eventIndex}
        >
          {event.image ? (
            <div
              className={
                'basis-full h-[20rem] transition-all border-b-[1px] duration-300 ease-in-out border-opacity-20 group-hover:border-opacity-100 ' +
                EVENT_STYLES[eventIndex % EVENT_STYLES.length]
              }
            >
              <img
                alt={event.name + ' cover image'}
                className="object-cover w-full h-full"
                src={
                  'https://cdn.discordapp.com/guild-events/' +
                  event.id +
                  '/' +
                  (event.image || '') +
                  '.jpg?size=2048'
                }
              />
            </div>
          ) : (
            <></>
          )}
          <h4 className="z-10  pl-4 py-2 text-xl flex-1 justify-self-start">
            {event.name}
          </h4>
          <span className="z-10 pr-4 py-2 text-lg flex 1 justify-self-end text-right">
            {typeof eventTimes[event.id] !== 'undefined'
              ? eventTimes[event.id]
              : ''}
          </span>
          {event.description ? (
            <p
              className={
                'bg-[#1b1c1f] z-10 basis-full px-4 border-t-[1px] mt-2 py-2 transition-all duration-300 ease-in-out border-opacity-20 group-hover:border-opacity-100 ' +
                EVENT_STYLES[eventIndex % EVENT_STYLES.length]
              }
            >
              {event.description || ''}
            </p>
          ) : (
            <></>
          )}
          {event.id !== '-1' ? (
            <p
              className={
                'bg-[#1b1c1f] z-10 basis-full px-4 border-t-[1px] py-2 transition-all duration-300 ease-in-out border-opacity-20 group-hover:border-opacity-100 ' +
                EVENT_STYLES[eventIndex % EVENT_STYLES.length]
              }
            >
              <HyperlinkButton
                className="md:max-w-[10rem]"
                intention={'normal'}
                href={
                  'https://discord.com/events/' +
                  encodeURIComponent(event.guild_id || '') +
                  '/' +
                  encodeURIComponent(event.id)
                }
              >
                Join Event
              </HyperlinkButton>
            </p>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiscordEventList;
