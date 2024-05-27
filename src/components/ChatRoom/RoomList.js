import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useMemo } from "react";
import AppProvider, { AppContext } from "../Context/appProvider";

const { Panel } = Collapse;
const PanelStyle = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      margin-top: 10px;
      background: #fff;
    }
  }
`;

const LinkStyle = styled(Typography.Link)`
  display: block;
  magrn-bottom: 5px;
  color: #fff;
`;


function RoomList() {
  const { rooms , isAddRoom, setIsAddRoom, setSelectedRoomId} = useContext(AppContext);
  const handleAddRoom = () => {
    setIsAddRoom(true);
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyle header="Danh sách phòng" key="1">
        {rooms.map((room) => (
          <LinkStyle onClick={() => setSelectedRoomId(room.id)} key={room.id}>
            {room.name}
          </LinkStyle>
        ))}
        <Button
          onClick={handleAddRoom}
          type="text"
          icon={<PlusOutlined />}
          className="add-room"
        >
          {" "}
          Thêm phòng
        </Button>
      </PanelStyle>
    </Collapse>
  );
}

export default RoomList;
