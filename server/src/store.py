from asyncio import Queue
from datetime import datetime
from typing import Dict, List, TypedDict

import redis

r = redis.Redis(host='redis', port=6379, db=0)


class User(TypedDict):
    id: str
    username: str


class Event(TypedDict):
    id: str
    user_id: str
    level: str
    message: str
    created_at: datetime


users: Dict[str, User] = dict()
events: List[Event] = []
queues: List[Queue[Event]] = []
