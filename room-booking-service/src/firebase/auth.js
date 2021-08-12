import firebase from 'firebase/app';
import 'firebase/auth';
import { createRoomDocument } from './RoomDoc';


export const roomCreation = async ({ roomId, roomName, roomNumber, occupant}) => {
    let roomId_enhanced = roomId;
    if(roomId.length<6){ for (let index = roomId.length; index < 7; index++) { roomId_enhanced = "0" + roomId_enhanced; } }
    const resp = await firebase.auth().createUserWithEmailAndPassword(roomId + "@theroombookingservice.com", roomId_enhanced);
    const room = resp.user;
    await room.updateProfile({  displayName: `RoomId: ${roomId}, RoomName: ${roomName}, RoomNumber: ${roomNumber}, RoomOccupant: ${occupant}`});  
    await createRoomDocument(room);
    return room;
}

export const logout = () => { return firebase.auth().signOut(); }

export const getRoom = async ({ roomId }) => {
    let roomId_enhanced = String(roomId);
    if(roomId.length<6){ for (let index = roomId.length; index < 7; index++) { roomId_enhanced = "0" + roomId_enhanced; } }
    const resp = await firebase
      .auth()
      .signInWithEmailAndPassword(String(roomId) + "@theroombookingservice.com", roomId_enhanced);
  
    return resp.user;
  };