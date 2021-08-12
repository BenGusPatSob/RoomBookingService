import React from 'react';
import { logout } from './firebase/auth';
import { useHistory } from 'react-router-dom';
import { useSession } from './firebase/RoomProvider';

function Header() {
  const history = useHistory();
  const { room } = useSession();

  const logoutRoom = async () => {
    await logout();
    // history.push('/createRoom');
    history.push('/getRoom');
  };

  return (
    <header>
      <h2>The Room Booking Service</h2>
      {!!room && (
        <button className="ui secondary button logout" onClick={logoutRoom}>
          EXIT
        </button>
      )}
    </header>
  );
}

export default Header;