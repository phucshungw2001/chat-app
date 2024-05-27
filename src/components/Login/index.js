import React from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth, db } from "../../FireBase/config";
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import { addDocument, generateKeywords } from "../../FireBase/service";

const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();

function Login() {
  const handleFBLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, fbProvider);

      // Truy vấn cơ sở dữ liệu để kiểm tra người dùng
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("New user");
        addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: user.providerId,
          keywords: generateKeywords(user.displayName),
        });
      } else {
        console.log("User already exists");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Title style={{ textAlign: "center" }}>Chat</Title>
          <button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </button>
          <button onClick={handleFBLogin} style={{ width: "100%" }}>
            Đăng nhập bằng FaceBook
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
