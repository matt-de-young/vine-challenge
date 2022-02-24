from typing import Dict, Iterable, List, Optional, Union

from ariadne import QueryType, convert_kwargs_to_snake_case

from src.store import Event, User, events, users

query = QueryType()


@query.field("events")
@convert_kwargs_to_snake_case
async def resolve_events(obj, info, user_id: str, level: str = None) -> Dict[str, Union[bool, Iterable[Event]]]:

	def filter_by_userid(event) -> List[Event]:
		return event["user_id"] == user_id

	def filter_by_level(event) -> List[Event]:
		return event["level"] == level

	filtered_events = filter(filter_by_userid, events)

	if level:
		filtered_events = filter(filter_by_level, events)

	return {
		"success": True,
		"events": filtered_events
	}

@query.field("userId")
@convert_kwargs_to_snake_case
async def resolve_user_id(obj, info, username: str) -> Optional[str]:
	user = users.get(username)
	if user:
		return str(user["id"])
