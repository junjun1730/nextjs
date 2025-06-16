import { BookData, ReviewData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";

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

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    {
      next: { tags: [`review-${bookId}`] }, // 3초마다 재검증
    }
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed with status ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => {
        return <ReviewItem key={review.id} {...review} />;
      })}
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
      <ReviewList bookId={(await params).id} />
    </div>
  );
}
