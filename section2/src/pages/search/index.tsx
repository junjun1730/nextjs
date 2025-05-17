import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { name } = router.query;

  return <div>Search {name}</div>;
};

export default Page;
