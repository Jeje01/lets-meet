import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

export const Loading = () => {
  return (
    <Flex align="center" gap="middle">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex>
  );
};
