import { BookItemSkeleton } from "./book-item-skeleton";

export function BookListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, index) => <BookItemSkeleton key={index} />);
}
