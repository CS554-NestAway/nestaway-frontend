import React from "react";
import { useContext, useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import api, { GuestURL } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, List, Space,Button } from "antd";
import axios from "axios";

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const GuestBookings = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([1]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`${GuestURL}/bookings`);
      setData(res.data);
      setList(res.data);
      setInitLoading(false);
    };

    fetch();
  }, []);

  return bookings.length === 0 ? (
    <div>no bookings</div>
  ) : (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(house) => (
        <List.Item
          key={house.title}
          actions={[

    <Button type="primary" key={1}>change date</Button>,
    <Button type="primary" danger key={1}>cancel</Button>,
    // <Button>Default Button</Button>,
    // <Button type="dashed">Dashed Button</Button>,
    // <Button type="text">Text Button</Button>,
    // <Button type="link">Link Button</Button>,

            <IconText
              icon={StarOutlined}
              text="checkIn"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="checkOut"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="totalPrice"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={house.avatar} />}
            title={<a href={house.href}>{house.title}</a>}
            description={house.description}
          />
          {house.content}
        </List.Item>
      )}
    />
  );
};

export default GuestBookings;
