import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import { ReactNode } from "react";

const Page = () => {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
export default Page;
