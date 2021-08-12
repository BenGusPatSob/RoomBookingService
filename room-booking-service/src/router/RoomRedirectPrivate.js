import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../firebase/RoomProvider';

const RoomRedirectPrivate = ({ component: Component, ...rest }) => {
  const { room } = useSession();

  return (
    <Route
      {...rest}
      render={(props) =>{
          const id = props.match.params.id;
          if (!!room && room.uid === id) {
              return <Component {...props}/>
          }else{
              return <Redirect to="/getRoom"/>
          }
      }
      }
    />
  );
};

export default RoomRedirectPrivate;