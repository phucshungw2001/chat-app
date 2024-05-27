import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import styled from "styled-components";
import { UserAddOutlined, MoreOutlined } from "@ant-design/icons";
import Message from "./Message";
import { AppContext } from "../Context/appProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { addDocument } from "../../FireBase/service";
import { AuthContext } from "../Context/auth";

const WrapperStyle = styled.div`
  height: 100%;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-title {
      margin: 0;
      font-weight: bold;
    }

    &-description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyle = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border-radius: 20px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0px;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f0f2f5; // Padding around the thumb
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  &::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 10px;
  }
`;

const MessageStyled = styled.div`
  display: flex;
`;

const { TextArea } = Input;

function ChatWindow() {
  const { selectRoom, members, messages, isInviteMember, setIsInviteMember } =
    useContext(AppContext);

  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectRoom.id,
      displayName,
    });

    form.resetFields(["message"]);
  };

  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <WrapperStyle>
      {selectRoom ? (
        <>
          <HeaderStyle>
            <div className="header-info">
              <p className="header-title">{selectRoom.name}</p>
              <span className="header-description">
                {selectRoom.descriptions}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMember(true)}
                style={{ marginRight: "5px" }}
              >
                Mời
              </Button>
              <Avatar.Group size="small" maxCount={3}>
                {members.map((member) => (
                  <Tooltip key={member.id} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName &&
                          member.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyle>
          <ContentStyle>
            <MessageListStyled ref={messageListRef}>
              {messages.map((mess) => (
                <div>
                  <MessageStyled
                    key={mess.id}
                    style={
                      mess.uid === uid
                        ? { justifyContent: "end" }
                        : { justifyContent: "start" }
                    }
                  >
                    <Message
                      displayName={mess.displayName}
                      text={mess.text}
                      createdAt={mess.createdAt}
                      photoURL={mess.photoURL}
                      id={mess.uid}
                      messId={mess.id}
                    />
                  </MessageStyled>
                </div>
              ))}
            </MessageListStyled>
            <FormStyle form={form}>
              <Form.Item name="message">
                <TextArea
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn. "
                  autoComplete="off"
                  onPressEnter={handleOnSubmit}
                  autoSize={{ minRows: 1, maxRows: 2 }}
                />
              </Form.Item>
              <Button
                style={{ marginLeft: "5px" }}
                onClick={handleOnSubmit}
                type="primary"
              >
                Gửi
              </Button>
            </FormStyle>
          </ContentStyle>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closeIcon
        ></Alert>
      )}
    </WrapperStyle>
  );
}

export default ChatWindow;
