// src/app/layout.tsx

import React, { ReactNode } from "react";
import Head from "next/head"; // 페이지 메타데이터 설정

// 페이지 컴포넌트에서 children을 렌더링할 수 있도록 하는 레이아웃 컴포넌트
type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Head 컴포넌트에서 title, meta 태그 등을 설정 */}
      <Head>
        <title>로그인 페이지</title>
      </Head>

      {children}
    </>
  );
};

export default Layout;
