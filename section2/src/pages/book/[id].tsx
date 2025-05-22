import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

// [...id ] -> catch all segment
// [[...id]] -> optional catch all segment  index도 대응
const Page = ({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!book) {
    return "Error";
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
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
  );
};

export default Page;
