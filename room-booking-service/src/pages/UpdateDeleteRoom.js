import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSession } from '../firebase/RoomProvider';
import { firestore } from '../firebase/config';
import { updateRoomDocument, deleteRoomDocument } from '../firebase/RoomDoc';
import { logout } from '../firebase/auth';

const Room = () => {
  const history = useHistory();
  const { room } = useSession();
  const params = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [roomDocument, setRoomDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const docRef = firestore.collection('rooms').doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setRoomDocument(documentData);
        const formData = Object.entries(documentData).map((entry) => ({ [entry[0]]: entry[1], }));
        // setValue(formData);
        setValue("roomId", Object.values(formData[formData.map(x => Object.keys(x) == "roomId").indexOf(true)])[0]);
        setValue("roomName", Object.values(formData[formData.map(x => Object.keys(x) == "roomName").indexOf(true)])[0]);
        setValue("roomNumber", Object.values(formData[formData.map(x => Object.keys(x) == "roomNumber").indexOf(true)])[0]);
        setValue("roomOccupant", Object.values(formData[formData.map(x => Object.keys(x) == "roomOccupant").indexOf(true)])[0]);
      }
    });
    return unsubscribe;
  }, [room.uid, setValue, params.id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateRoomDocument({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (data) => {
    try {
      setLoading(true);
      await deleteRoomDocument({ uid: params.id, ...data });
      await logout();
      history.push('/getRoom');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!roomDocument) {
    return null;
  }

  const formClassname = `ui big form ${isLoading ? 'loading' : ''}`;

  return (
    <div className="add-form-container" style={{ maxWidth: 960, margin: '50px auto' }}>
      <p>{JSON.stringify(roomDocument).replace(/,/g,"_______\n").replace("{","_______").replace("}","\n_______")}</p>
      {/* <form className={formClassname} onSubmit={handleSubmit(onSubmit)}> */}
      <form className={formClassname} >
        <div className="field">
            <label>
                ID
                <input placeholder="Room Id" {...register("roomId")} />
            </label>
        </div>
        <div className="field">
            <label>
                Name
                <input placeholder="Room Name" {...register("roomName")} />
            </label>
        </div>
        <div className="field">
            <label>
                Number
                <input placeholder="Room Number" {...register("roomNumber")} />
            </label>
        </div>
        <div className="field">
            <label>
                Occupant
                <input placeholder="Occupant" {...register("roomOccupant")} />
            </label>
        </div>
        {/* <button type="submit" className="ui submit large grey button right floated">        
          Change
        </button> */}
        <button type="submit" onClick={handleSubmit(onSubmit)} className="ui submit large grey button right floated">        
          Change
        </button>
        <button type="submit" onClick={handleSubmit(onDelete)} className="ui submit large grey button right floated">        
          Delete
        </button>
      </form>
    </div>
  )
}

export default Room;