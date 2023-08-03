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

export const DiscordEventList = (props: DiscordEventListProps) => (
  <div className={props.className || ''}>
    {props.events.map((event, eventIndex) => (
      <div className="" key={props.id + '_event_' + eventIndex}>
        <h4 className="inline-block float-left w-auto h-auto">{event.name}</h4>
        <span className="inline-block float-right w-auto h-auto">
          {event.scheduled_start_time}
        </span>
      </div>
    ))}
  </div>
);

export default DiscordEventList;
