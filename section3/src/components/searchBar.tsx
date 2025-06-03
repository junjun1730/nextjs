"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onsubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input onChange={onChangeHandler} type="text" />
      <button onClick={onsubmit}>검색</button>
    </div>
  );
}
