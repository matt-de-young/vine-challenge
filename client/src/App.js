import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { useState } from 'react';
import './App.css';
import { LoginForm } from './LoginForm';

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/'
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8000/',
//   options: {
//     reconnect: true
//   }
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
//   },
//   wsLink,
//   httpLink,
// );

export const client = new ApolloClient({
  // splitLink,
  httpLink,
  cache: new InMemoryCache(),
});

const FETCH_EVENTS = gql`
  query FetchEvents($userId: String!) {
      events(userId: $userId) {
        events {
          id
          message
          createdAt
        }
        success 
        errors
      }
    }
`;

function Events({ userId }) {
  const { loading, error, data } = useQuery(FETCH_EVENTS, {
    fetchPolicy: 'no-cache',
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.events.map(({ id, message, createdAt }) => (
    <div key={id}>
      <p>
        {createdAt}: {message}
      </p>
    </div>
  ));
}

function App() {

  const [userId, setUserId] = useState();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>🪴 Vine Event Log 🪴</h2>
        {userId &&
          <button onClick={() => setUserId(undefined)}>Log Out</button>
        }
        {userId
          ? <Events userId={userId} />
          : <LoginForm setUserId={setUserId} />
        }
      </div>
    </ApolloProvider>
  );
}

export default App;
