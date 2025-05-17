import { useRouter } from "next/router";

// [...id ] -> catch all segment
const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Book{id}</div>;
};

export default Page;
