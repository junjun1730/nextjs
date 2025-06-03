import ClientComponent from "@/components/client-component";
import SearchBar from "../../components/searchBar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SearchBar />
      <ClientComponent>
        <></>
      </ClientComponent>

      <div>{children}</div>
    </div>
  );
}
