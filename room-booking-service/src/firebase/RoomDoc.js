import { firestore } from './config';

export const createRoomDocument = async (room) => {
  // referencia al Firestore document de una rooom específica
  const docRef = firestore.doc(`/rooms/${room.uid}`);

  // create room object
  const roomProfile = {
    uid: room.uid,
    roomId: room.email.split("@")[0],
    roomName: room.displayName.split(", ")[1].split(": ")[1],
    roomNumber: room.displayName.split(", ")[2].split(": ")[1],
    roomOccupant: room.displayName.split(", ")[3].split(": ")[1],
  };

  // write to Cloud Firestore
  return docRef.set(roomProfile);
};

export const updateRoomDocument = async (room) => {
  const docRef = firestore.doc(`/rooms/${room.uid}`);
  return docRef.update(room);
};

export const deleteRoomDocument = async (room) => {
  const docRef = firestore.doc(`/rooms/${room.uid}`);
  return docRef.delete(room);
};