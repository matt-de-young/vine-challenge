from datetime import datetime
from typing import Dict, List, Union
from uuid import UUID, uuid4

from ariadne import MutationType, convert_kwargs_to_snake_case

from src.store import Event, User, events, queues, users

mutation = MutationType()


@mutation.field("createUser")
@convert_kwargs_to_snake_case
async def resolve_create_user(obj, info, username: str) -> Dict[str, Union[bool, List[str], User]]:
	try:
		if not users.get(username):
			user: User = {
				"id": str(uuid4()),
				"username": username
			}
			users[username] = user
			return {
				"success": True,
				"user": user
			}
		return {
			"success": False,
			"errors": ["Username is taken"]
		}

	except Exception as error:
		return {
			"success": False,
			"errors": [str(error)]
		}

@mutation.field("createEvent")
@convert_kwargs_to_snake_case
async def resolve_create_event(
		obj,
		info,
		user_id: str,
		level: str,
		message: str,
	) -> Dict[str, Union[bool, List[str], Event]]:
	try:

		event: Event = {
			"id": str(uuid4()),
			"user_id": user_id,
			"level": level,
			"message": message,
			"created_at": datetime.now()
		}
		events.append(event)
		for queue in queues:
			await queue.put(event)
		return {
			"success": True,
			"event": event
		}
	except Exception as error:
		return {
			"success": False,
			"errors": [str(error)]
		}
