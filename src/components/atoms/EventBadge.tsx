import { Event } from '@/atoms/types';
import { getEventStatus } from '@/lib/utils';

import { Badge } from '../ui/badge';

interface EventBadgeProps {
  event: Pick<Event, 'eventStartDate' | 'eventEndDate'>;
}

const EventBadge: React.FC<EventBadgeProps> = ({ event }) => {
  const status = getEventStatus(event);

  const variant = status === 'ongoing' ? 'default' : status === 'upcoming' ? 'secondary' : 'outline';

  const text = status === 'ongoing' ? '진행 중' : status === 'upcoming' ? '예정' : '종료';

  return <Badge variant={variant}>{text}</Badge>;
};

export default EventBadge;
