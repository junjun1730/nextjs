import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// export const dynamic = "force-static"; // 특정 페이지의 유형을 강제로 Static, Dynamic으로 설정
// 1. auto - 자동으로 설정, 아무것도 강제하지 않음 생략가능
// 2. force-static - 강제로 Static으로 설정
// 3. force-dynamic - 강제로 Dynamic으로 설정
// 4. error - 페이지를 강제로 Static 페이지 설정, Static이 안되는 이유가 있다면 에러 발생

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>에러가 발생했습니다.</div>;
  }

  const allBook: BookData[] = await response.json();

  return (
    <div>
      {allBook.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
    //{ cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>에러가 발생했습니다.</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
