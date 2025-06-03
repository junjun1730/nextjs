"use client";

export default function ClientComponent({
  children,
}: {
  children?: React.ReactNode;
}) {
  console.log("client component");
  return <div>{children}</div>;
}
