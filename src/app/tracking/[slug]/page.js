"use client";
import { useSearchParams } from "next/navigation";

export default function Item() {
  const searchParams = useSearchParams();

  return (
    <div>
      <h1>{searchParams.get("name")}</h1>
      <p>Price: {searchParams.get("price")}</p>
    </div>
  );
}
