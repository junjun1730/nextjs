import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books.ts";
import Head from "next/head";

export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행됨. 컴포넌트에 필요한 데이터를 불러옴
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: { allBooks, recoBooks },
    //revalidate: 3, // ISR
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>one bite books</title>
        <meta property="on:image" content="/thumbnail.png" />
        <meta property="og:title" content="one bite" />
        <meta property="description" content="books" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>おすすめの本</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>全ての本一覧</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
