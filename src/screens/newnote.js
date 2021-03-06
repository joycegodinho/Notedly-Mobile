import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { useMutation, gql } from '@apollo/client';


import NoteForm from '../components/NoteForm';
import Loading from '../components/Loading';

const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const GET_NOTES = gql`
    query notes {
        notes {
            id
            createdAt
            content
            favoriteCount 
            author {
                username
                id
            }
        }
    }
`;

const GET_MY_NOTES = gql`
    query me {
        me {
            id 
            username
            notes {
                id 
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                }
            }
        }
    }
`;

const NewNote = props => {
  
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES },{ query: GET_NOTES}]
    
  });
    if(loading) return <Loading />
    return (
    <React.Fragment>
        {error && <Text>Error!</Text>}
        <NoteForm action={data} navigation={props.navigation} />
    </React.Fragment>
    )
};

export default NewNote;