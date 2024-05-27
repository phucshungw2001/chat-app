import React, { useContext, useMemo, useState } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import { AppContext } from "../Context/appProvider";
import { AuthContext } from "../Context/auth";
import { db } from "../../FireBase/config";
import {
  collection,
  limit,
  orderBy,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value} label={option.label}>
          <Avatar size="small" src={option.photoURL}>
            {option.photoURL ? "" : option.label && option.label.charAt(0).toUpperCase()}
          </Avatar>
          {`${option.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, currentMembers) {
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search),
    orderBy("displayName"),
    limit(20)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => ({
      label: doc.data().displayName,
      value: doc.data().uid,
      photoURL: doc.data().photoURL,
    }))
    .filter((user) => !currentMembers.includes(user.value));
}

function InviteMemberModal() {
  const { isInviteMember, setIsInviteMember, selectedRoomId, selectRoom } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const roomRef = doc(db, "rooms", selectedRoomId);

      await updateDoc(roomRef, {
        members: arrayUnion(...value.map((val) => val.value)),
      });

      form.resetFields();
      setIsInviteMember(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thành viên: ", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsInviteMember(false);
  };

  return (
    <Modal
      title="Thêm thành viên"
      open={isInviteMember}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="members"
          label="Tên các thành viên"
          rules={[{ required: true, message: "Vui lòng chọn thành viên" }]}
        >
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={(search) => fetchUserList(search, selectRoom.members)}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InviteMemberModal;
