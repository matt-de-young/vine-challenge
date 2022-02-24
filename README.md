# Vine Challenge
The goal of this project was to produce a back-end with an API for time based events and a client that could consume those in real time.

It didn't go super well...

The API part of it went pretty well. I chose to use Ariadne to provide a GraphQL API. This is perhaps not the best option for a project with an extremely tight deadline.
It does however have the ability to create users (without authentication), create events, query events, and subscribe to events.

On the front-end is where things really broke down. The whole reason I chose GraphQL is that I have been wanting to try Apollo Client for a while.
I don't know if the project is immature, or if I am just missing something but the most sucess I had was with getting the subscription working.
I was never able to get any of the queries or mutations working. I might try to spend some more time with that later.

The next steps after debugging whatever is going wrong with the Apollo client are:

**Add a data store for the backend** -  I was planning to use Redis but ended up getting bogged down in the front-end.

**Deploy it somewhere** - I would be leaning towards Kubernetes if this were a real project, but I would have to figure out the subsciptions.

**Authenitcation** - Obviously we would want to do better than the honor system.


## Server
Start the server by running:
```
docker compose up
```

The graphQL dashboard can be reached at `http://localhost:8000/`

Here are some example queries that could be run:
```
mutation CreateUser($username: String!) {
  createUser(
    username: $username
  ){
    user {
      id
    }
  }
}

mutation CreateEvent($userId: String!) {
  createEvent(
    userId:$userId
    level: INFO
    message: "sup"
  ){
    event {
      id
    }
  }
}

query FetchEvents($userId: String!) {
  events (userId: $userId) {
    events {
      message
      level
      createdAt
    }
  }
}
```

One can also create a "real-time" subsription for new events:
```
subscription EventSub($userId: String!) {
  newEvent(userId: $userId) {
    id
    level
    message
    createdAt
  }
}
```

## Client
Start the server by running:
```
npm start
```