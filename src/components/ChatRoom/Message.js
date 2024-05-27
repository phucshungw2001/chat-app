import {
  Avatar,
  Button,
  Typography,
  Dropdown,
  message,
  Space,
  Tooltip,
  Modal,
} from "antd";
import styled from "styled-components";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import { UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import { deleteDocument } from "../../FireBase/service";

const WrapperStyle = styled.div`
  margin-bottom: 10px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  align-items: ${({ isownmessage }) =>
    isownmessage === "true" ? "flex-end" : "flex-start"};

  .message-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .author {
    margin-left: 10px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ isownmessage }) =>
      isownmessage === "true" ? "#e6f7ff" : "#f5f5f5"};
    color: #000;
    max-width: 500px;
    line-height: 2;
  }

  .outline {
    margin-left: 5px;
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      background-color: rgb(197 197 197 / 26%);
    }
  }
`;

// Hàm để định dạng ngày giờ
function formatDate(createdAt) {
  let formattedDate = "";
  if (createdAt) {
    const date = new Date(createdAt.seconds * 1000);
    formattedDate = format(date, "hh:mm:ss ':' dd'/'MM'/'yyyy ");
  }
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

function Message({ displayName, text, createdAt, photoURL, id, messId }) {
  const {
    user: { uid },
  } = useContext(AuthContext);
  const isOwnMessage = id === uid;

  const { confirm, error, success } = Modal;
  const [modal, contextHolder] = Modal.useModal();
  const handleDeleteDoc = () => {
    deleteDocument("messages", messId)
      .then(() => {
        success({
          content: "Xóa tin nhắn thành công!",
        })
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
        error({
          content: "Xóa tin nhắn thất bại, vui lòng thử lại sau ít phút.",
        });
      });
  };

  const items = [
    {
      label: (
        <Button
          onClick={handleDeleteDoc}
          type="text"
          danger
          style={{ border: "none" }}
        >
          Xóa tin nhắn
        </Button>
      ),
      key: "0",
    },
  ];

  return (
    <WrapperStyle isownmessage={isOwnMessage.toString()}>
      {" "}
      {contextHolder}
      <div className="message-header">
        {!isOwnMessage && (
          <>
            <Avatar size="small" src={photoURL}>
              {photoURL
                ? ""
                : displayName && displayName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography.Text className="author">{displayName}</Typography.Text>
          </>
        )}
        <Typography.Text className="date">
          {formatDate(createdAt)}
        </Typography.Text>
        {isOwnMessage && (
          <div className="outline">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ padding: 0 }}>
                  <MoreOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="content">
        <Typography.Text>{text}</Typography.Text>
      </div>
    </WrapperStyle>
  );
}

export default Message;
