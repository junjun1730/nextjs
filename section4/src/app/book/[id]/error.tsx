"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error("에러가 발생했습니다:", error);
  }, [error]);
  return (
    <div>
      <h3>책 오류 발생</h3>
      <button
        onClick={() => {
          // v18 이상에서 사용 가능, UI를 변경시키는 작업을 일괄적으로 처리해줌
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴, 비동기적으로 실행됨.
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도하기
      </button>
    </div>
  );
}
