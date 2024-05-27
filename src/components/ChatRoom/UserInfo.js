import { Avatar, Button, Typography } from "antd";
import styled from "styled-components";
import { auth, db } from "../../FireBase/config";
import { useContext, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { AuthContext } from "../Context/auth";

const WrapperStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 28, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfo() {
  const { user } = useContext(AuthContext);
  const { displayName, photoURL } = user || {};

  return (
    <WrapperStyle>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName && displayName.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button onClick={() => auth.signOut()}>Đăng xuất</Button>
    </WrapperStyle>
  );
}

export default UserInfo;
