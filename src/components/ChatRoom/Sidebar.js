import { Row, Col, Layout } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

const SidebarStyle = styled.div`
  background: #3f0e40;
  color: #fff;
  height: 100vh;
`;

function Sidebar() {
  return (
    <SidebarStyle>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyle>
  );
}

export default Sidebar;
