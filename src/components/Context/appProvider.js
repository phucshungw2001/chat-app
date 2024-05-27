import React, { useContext, useMemo, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./auth";
import useFirestore from "../../hooks/userfilestore";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [isInviteMember, setIsInviteMember] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      value: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId);
  }, [rooms, selectedRoomId]);

  const userCondition = useMemo(() => {
    if (!selectRoom) {
      return {
        fieldName: "uid",
        operator: "in",
        value: [],
      };
    }

    return {
      fieldName: "uid",
      operator: "in",
      value: selectRoom.members,
    };
  }, [selectRoom]);

  const members = useFirestore("users", userCondition);

  const messageCondition = useMemo(() => {
    return{
      fieldName : "roomId",
      operator : "==",
      value : selectedRoomId
    }
  }, [selectedRoomId])
  const messages = useFirestore("messages" , messageCondition)

  return (
    <AppContext.Provider
      value={{
        members,
        rooms,
        selectRoom,
        messages,
        isAddRoom,
        setIsAddRoom,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMember,
        setIsInviteMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
