"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      { method: "POST", body: JSON.stringify({ bookId, content, author }) }
    );

    // 1. 특정 주소의 해당 하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`); // 리뷰 작성 후 해당 책 페이지를 재검증

    // // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/book/[id]", "page");

    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("(with-searchbar)", "layout");

    // // 4. 모든 페이지를 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`); // 리뷰 작성 후 해당 책의 리뷰 데이터를 재검증
  } catch (error) {
    console.error("리뷰 작성 중 오류 발생:", error);
    return;
  }
}
