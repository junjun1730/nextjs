import { BookData } from "@/types";

export default async function fetchRandomBooks(): Promise<BookData[]> {
  const url =
    "https://book-onebite-books-server-main-seven.vercel.app/book/random";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}
