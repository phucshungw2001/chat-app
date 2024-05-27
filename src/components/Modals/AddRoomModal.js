import { Input, Modal, Form } from "antd";
import { useContext } from "react";
import { AppContext } from "../Context/appProvider";
import { addDocument } from "../../FireBase/service";
import { AuthContext } from "../Context/auth";

function AddRoomModal() {
  const { isAddRoom, setIsAddRoom } = useContext(AppContext);
  const {user : {uid}} = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleOk = () => {
    // handle
    // add new rooms
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsAddRoom(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsAddRoom(false);
  };

  return (
    <Modal
      title="Tạo phòng"
      open={isAddRoom}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhập tên phòng"></Input>
        </Form.Item>
        <Form.Item label="Mô tả" name="descriptions">
          <Input.TextArea placeholder="Nhập mô tả"></Input.TextArea>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddRoomModal;
