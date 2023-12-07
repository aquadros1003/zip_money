import React from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Alert,
  Card,
  Row,
  Avatar,
  Col,
  DatePicker,
  Upload,
} from "antd";
import ME from "../api/queries/UpdateProfileData";
import TextArea from "antd/es/input/TextArea";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import UPDATE_PROFILE from "../api/mutations/UpdateProfile";
import { useMutation } from "@apollo/client";
import UPDATE_AVATAR from "../api/mutations/UpdateAvatar";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const UpdateProfileForm = () => {
  const { loading, data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });
  const [UpdateProfile, { loading: updateProfileLoading }] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: () => {
        toast.success("Profile updated successfully", {
          duration: 4000,
          position: "bottom-right",
          style: {
            border: "1px solid #fff",
            padding: "20px",
            fontSize: "1rem",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#0000ff",
          },
        });
      },
    }
  );

  const [UpdateAvatar] = useMutation(UPDATE_AVATAR);
  const user = data?.me;
  const shouldRenderForm = user !== null && user !== undefined && !loading;

  const onFinish = (values) => {
    UpdateProfile({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        description: values.description,
        dateOfBirth: values.dateOfBirth,
        facebookUrl: values.facebookUrl,
        instagramUrl: values.instagramUrl,
        twitterUrl: values.twitterUrl,
      },
    });
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleAvatarChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setPreviewUrl(imageUrl);
        setFile(info.file.originFileObj);
      });
    }
  };

  const onClickUpdateAvatar = async () => {
    if (!file) {
      return;
    }
    try {
      await UpdateAvatar({
        variables: {
          image: file,
        },
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return shouldRenderForm ? (
    <Card className="card">
      <Form
        name="edit_profile"
        onFinish={onFinish}
        initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          description: user?.description,
          facebookUrl: user?.facebookUrl,
          instagramUrl: user?.instagramUrl,
          twitterUrl: user?.twitterUrl,
        }}
      >
        <Row gutter={16}>
          <div>
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              iconTheme={{ primary: "#000", secondary: "#fff" }}
            />
          </div>
          <Col xs={24} sm={24} md={24} lg={20} xl={8}>
            <Row gutter={16} className="avatar">
              <Upload
                showUploadList={false}
                onChange={handleAvatarChange}
                customRequest={async ({ onSuccess }) => {
                  onSuccess("ok");
                }}
              >
                {previewUrl ? (
                  <Avatar src={previewUrl} alt="avatar" size={270} />
                ) : (
                  <Avatar
                    src={"http://localhost:8000/" + user?.avatar}
                    alt="avatar"
                    size={270}
                  />
                )}
              </Upload>
            </Row>
            <Row gutter={16} className="mt-3">
              <Form.Item
                name="facebookUrl"
                rules={[{ message: "Please input your facebook" }]}
                className="social"
              >
                <Input
                  className="update-profile-input"
                  placeholder="Facebook"
                />
              </Form.Item>
              <Form.Item
                name="instagramUrl"
                rules={[{ message: "Please input your instagram" }]}
                className="social"
              >
                <Input
                  className="update-profile-input"
                  placeholder="Instagram"
                />
              </Form.Item>
              <Form.Item
                name="twitterUrl"
                rules={[{ message: "Please input your twitter" }]}
                className="social"
              >
                <Input className="update-profile-input" placeholder="Twitter" />
              </Form.Item>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={14} className="mt-4">
            <Form.Item
              name="firstName"
              rules={[{ message: "Please input your first name" }]}
            >
              <Input
                className="update-profile-input"
                placeholder="First Name"
                prefix={<UserOutlined />}
                defaultValue={user?.firstName}
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ message: "Please input your last name" }]}
            >
              <Input
                className="update-profile-input"
                placeholder="Last Name"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                className="update-profile-input"
                placeholder="Email Address"
                disabled
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[{ message: "Please input your phone number" }]}
            >
              <Input
                className="update-profile-input"
                placeholder=" Phone Number"
                prefix="+48"
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ message: "Please input your phone number" }]}
            >
              <TextArea
                className="update-profile-input"
                type="textarea"
                placeholder="Description"
                rows={4}
              />
            </Form.Item>
            <Form.Item name="dateOfBirth">
              <DatePicker
                className="update-profile-input"
                placeholder={user?.dateOfBirth?.toLocaleString().split("T")[0]}
              />
            </Form.Item>
            <Form.Item
              name="gender"
              rules={[{ message: "Please input your phone number" }]}
            >
              <Input className="update-profile-input" placeholder="Gender" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className="justify-content-center">
          <Button
            type="primary"
            htmlType="submit"
            className="update-profile-button"
            loading={updateProfileLoading}
            onClick={onClickUpdateAvatar}
          >
            Save Changes
          </Button>
        </Row>
      </Form>
    </Card>
  ) : (
    <div className="text-center mt-5">
      <Spin />
    </div>
  );
};

export default UpdateProfileForm;
