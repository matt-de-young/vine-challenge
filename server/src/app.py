from ariadne import (load_schema_from_path, make_executable_schema,
                     snake_case_fallback_resolvers)
from ariadne.asgi import GraphQL

from src.mutations import mutation
from src.queries import query
from src.subscriptions import subscription

type_defs = load_schema_from_path("src/schema.graphql")

schema = make_executable_schema(
    type_defs, query, mutation, subscription, snake_case_fallback_resolvers)
app = GraphQL(schema, debug=True)
