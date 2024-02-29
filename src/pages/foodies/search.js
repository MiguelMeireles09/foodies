import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage() {
  const token = localStorage.getItem("token");
  console.log("token:", token);

  return (
    <div>
      <div>search:{`token:${token}`}</div>
    </div>
  );
}
