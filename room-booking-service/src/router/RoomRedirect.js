import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../firebase/RoomProvider';

const RoomRedirect = ({ component: Component, ...rest }) => {
  const { room } = useSession();

  return (
    <Route
      {...rest}
      render={(props) =>
        !room ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `/room/${room.uid}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default RoomRedirect;