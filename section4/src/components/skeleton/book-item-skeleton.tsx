import style from "./book-item-skeleton.module.css";

export function BookItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subTitle}></div>
        <div className={style.author}></div>
      </div>
      <br />
    </div>
  );
}
