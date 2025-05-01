"use client";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";

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
      <h1>Multi-select Dropdown</h1>
      <MultiSelectDropdown
        options={options}
        onChange={(selected) => console.log("Selected:", selected)}
      />
    </main>
  );
}
