import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase/app';

export const RoomContext = React.createContext();

export const RoomProvider = (props) => {
  const [session, setSession] = useState({user: null, loading: true});

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((room) => {
      setSession({loading: false, room})
    })

    return () => unsubscribe();
  }, []);

  return (
    <RoomContext.Provider value={session}>
      {!session.loading && props.children}
    </RoomContext.Provider>
  )
}

export const useSession = () => {
  const session = useContext(RoomContext);
  return session;
}