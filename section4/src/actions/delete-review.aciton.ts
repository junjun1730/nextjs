"use server";

import { revalidateTag } from "next/cache";

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      state: false,
      error: "삭제할 리뷰가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`); // 리뷰 삭제 후 해당 책의 리뷰 데이터를 재검증

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    console.error("리뷰 삭제 중 오류 발생:", error);
    return {
      state: false,
      error: `error, ${error}`,
    };
  }
}
