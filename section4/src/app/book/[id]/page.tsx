import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { createReviewAction } from "@/actions/create-review.action";

//export const dynamicParams = false; // 동적 파라미터를 사용하지 않음. 모두 404로 처리

// 정적 페이지 생성, Page router의 GetStaticPaths
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }]; // 문자열로만 생성 가능
}

async function BookDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>에러가 발생했습니다.</div>;
  }

  const {
    coverImgUrl,
    title,
    subTitle,
    author,
    publisher,
    description,
  }: BookData = await response.json();

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        <input hidden readOnly name="bookId" value={bookId} />
        <input required type="text" name="content" placeholder="리뷰 내용" />
        <input required type="text" name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={style.container}>
      <BookDetail params={params} />
      <ReviewEditor bookId={(await params).id} />
    </div>
  );
}
