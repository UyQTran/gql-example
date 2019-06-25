import React from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://0449e1e4.ngrok.io"
});

const getMessages = gql`
  {
    getMessages {
      text
    }
  }
`;

const createMessage = gql`
  mutation CreateMessage($message: String) {
    createMessage(message: $message)
  }
`;

function App() {
  let input;
  return (
    <div className="App">
      <Query client={client} query={getMessages} pollInterval={500}>
        {
          ({loading, error, data}) => {
            if(loading) return <span>Loading...</span>;
            if(error) return <span>Something bad happened...</span>;

            return (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {data.getMessages.map((message) => (
                  <span>{message.text}</span>
                ))}
              </div>
            );
          }
        }
      </Query>
      <Mutation mutation={createMessage} client={client}>
        {
          (createMessage) => {

            return (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  createMessage({ variables: { message: input.value } });
                  input.value = "";
                }}
              >
                <input
                  ref={node => {
                    input = node;
                  }}
                />
                <button type="submit">Send</button>
              </form>
            );
          }
        }
      </Mutation>
    </div>
  );
}

export default App;
