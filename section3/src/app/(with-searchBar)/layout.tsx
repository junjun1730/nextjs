export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>searchBar</div>
      <div>{children}</div>
    </div>
  );
}
