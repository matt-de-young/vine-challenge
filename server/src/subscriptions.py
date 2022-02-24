from asyncio import CancelledError, Queue
from typing import AsyncIterable, Iterable

from ariadne import SubscriptionType, convert_kwargs_to_snake_case

from src.store import Event, queues

subscription = SubscriptionType()


@subscription.source("newEvent")
@convert_kwargs_to_snake_case
async def new_event_source(obj, info, user_id: str) -> AsyncIterable[Event]:
    queue = Queue()
    queues.append(queue)
    try:
        while True:
            print('listen')
            event: Event = await queue.get()
            queue.task_done()
            if event["user_id"] == user_id:
                yield event
    except CancelledError:
        queues.remove(queue)
        raise


@subscription.field("newEvent")
@convert_kwargs_to_snake_case
async def new_event_resolver(event: Event, info, user_id: str):
    return event
