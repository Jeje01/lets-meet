import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { GoogleAnalytics } from "@next/third-parties/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // @ts-ignore
      window.gtag("config", "GTM-TXMT296P", {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AntdRegistry>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4630273089107228"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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
          <GoogleAnalytics gaId="G-XGVMSP4MW6" />
        </ConfigProvider>
      </QueryClientProvider>
    </AntdRegistry>
  );
}
