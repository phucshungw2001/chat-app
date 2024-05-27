import React, { useContext, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import UserInfo from "./UserInfo";
import ChatWindow from "./ChatWindow";
import { AppContext } from "../Context/appProvider";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;

const PanelStyle = styled.div`
  .add-room {
    margin-top: 10px;
    background: #fff;
  }
`;

const LinkStyle = styled.div`
  display: block;
  margin-bottom: 5px;
  color: #fff;
  cursor: pointer;
`;

function ChatRoom() {
  const [collapsed, setCollapsed] = useState(false);
  const { rooms, setSelectedRoomId, setIsAddRoom } = useContext(AppContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = rooms.map((room) => ({
    key: room.id,
    label: room.name,
    onClick: () => setSelectedRoomId(room.id),
  }));

  const handleAddRoom = () => {
    setIsAddRoom(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <UserInfo />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[rooms[0]?.id]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            maxHeight: "60px",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            style={{
              fontSize: "16px",
              width: 60,
              height: 60,
            }}
          />
          <Button
            onClick={handleAddRoom}
            type="text"
            icon={<PlusOutlined />}
            className="add-room"
            style={{
              marginRight: "16px",
            }}
          >
            {" "}
            Thêm phòng
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 120px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ChatWindow style={{ height: "100%" }} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default ChatRoom;
