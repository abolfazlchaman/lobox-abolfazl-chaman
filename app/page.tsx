"use client";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Link from "next/link";

const options = [
  { label: "Education", emoji: "🎓" },
  { label: "Yeeeah, science!", emoji: "🧪" },
  { label: "Art", emoji: "🎨" },
  { label: "Sport", emoji: "⚽" },
  { label: "Games", emoji: "🎮" },
  { label: "Health", emoji: "🏥" },
];

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Multi-select Dropdown </h1>
      <p>
        Lobox assesment - by&nbsp;
        <Link
          target="_blank"
          href={"www.abolfazlchaman.com"}>
          Abolfazl chaman
        </Link>
      </p>
      <div style={{ width: "300px" }}>
        <MultiSelectDropdown
          options={options}
          onChange={(selected) => console.log("Selected:", selected)}
        />
      </div>
    </main>
  );
}
