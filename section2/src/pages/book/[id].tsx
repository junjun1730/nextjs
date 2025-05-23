import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // true : 없는 페이지에 대해서 SSR로 동작하며 fallback상태의 데이터가 없는 페이지부터 반환함
    // false : not found page
    // "blocking" : 없는 페이지에 대해서는 SSR로 동작함
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

// [...id ] -> catch all segment
// [[...id]] -> optional catch all segment  index도 대응
const Page = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return;
    <>
      <Head>
        <title>detail page</title>
        <meta property="on:image" content="" />
        <meta property="og:title" content="" />
        <meta property="description" content="" />
      </Head>
      <div>{"로딩중입니다."}</div>
    </>;
  }
  if (!book) {
    return "Error";
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>detail page - {title}</title>
        <meta property="on:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url("${coverImgUrl}")` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author}|{publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
};

export default Page;
