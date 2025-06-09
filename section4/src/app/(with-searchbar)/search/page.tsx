import BookItem from "@/components/book-item";
import { BookListSkeleton } from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

//export const dynamic = "force-static"; // 강제로 Static 페이지로 설정, 쿼리스트링등은 자동으로 undifined로 처리됨

async function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await delay(1500);
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>에러가 발생했습니다.</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}
