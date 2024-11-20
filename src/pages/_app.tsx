import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntdRegistry>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </AntdRegistry>
  );
}
