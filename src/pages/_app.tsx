import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF570F",
            borderRadius: 4,
            // controlHeight: 18,
            fontSize: 14,
            fontFamily: "var(--font-pretendard)",
            colorBgContainer: "white",
          },
          components: {
            Calendar: {
              itemActiveBg: "#FF570F",
              fullPanelBg: "#F7F6FA",
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </AntdRegistry>
  );
}
