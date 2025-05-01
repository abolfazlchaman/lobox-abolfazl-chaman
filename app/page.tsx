"use client";

import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import Link from "next/link";
import { useState } from "react";

type Option = {
  label: string;
  emoji: string;
};

const initialOptions: Option[] = [
  { label: "Education", emoji: "🎓" },
  { label: "Yeeeah, science!", emoji: "🧪" },
  { label: "Art", emoji: "🎨" },
  { label: "Sport", emoji: "⚽" },
  { label: "Games", emoji: "🎮" },
  { label: "Health", emoji: "🏥" },
];

export default function HomePage() {
  const [options, setOptions] = useState(initialOptions);
  const [, setSelected] = useState<Option[]>([]);

  const handleChange = (newSelected: Option[]) => {
    setSelected(newSelected);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Multi-select Dropdown</h1>
      <p>
        Lobox assessment - by&nbsp;
        <Link
          target="_blank"
          href="https://www.abolfazlchaman.com">
          Abolfazl Chaman
        </Link>
      </p>
      <div style={{ width: "300px" }}>
        <MultiSelectDropdown
          options={options}
          onChange={handleChange}
          setOptions={setOptions}
        />
      </div>
    </main>
  );
}
