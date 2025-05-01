"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.scss";
import Chevron from "../public/chevron.svg";
import Image from "next/image";

interface Option {
  label: string;
  emoji: string;
}

interface Props {
  options: Option[];
  onChange: (selected: Option[]) => void;
  setOptions: (options: Option[]) => void;
}

export default function MultiSelectDropdown({ options, onChange, setOptions }: Props) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<Option[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddOption = (option: Option) => {
    if (!selected.some((s) => s.label === option.label)) {
      const newSelected = [option, ...selected];
      setSelected(newSelected);
      onChange(newSelected);

      // Remove the selected option from the options list in parent component
      setOptions(options.filter((o) => o.label !== option.label)); // Update options
    }
    setInput(""); // Reset input after adding option
  };

  const handleRemoveOption = (index: number) => {
    const removedOption = selected[index]; // Save the removed option
    const newSelected = selected.filter((_s, i) => i !== index);
    setSelected(newSelected);
    onChange(newSelected);

    // Add the removed option back to available options in parent component
    setOptions([removedOption, ...options]); // Add back to options list
    setDropdownOpen(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const newOption = { label: input.trim(), emoji: "🎉" }; // Default emoji
      handleAddOption(newOption);
    }
  };

  return (
    <div
      className={styles.container}
      ref={dropdownRef}>
      <div
        className={`${styles.inputWrapper} ${dropdownOpen ? styles.open : ""}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}>
        {selected.map((s, i) => (
          <span
            key={i}
            className={styles.tag}>
            <button
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveOption(i);
              }}>
              ×
            </button>
            &nbsp;{s.emoji} {s.label}
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type or select..."
        />
        <Image
          src={Chevron.src}
          width={16}
          height={18}
          className={`${styles.chevron} ${dropdownOpen ? styles.open : styles.closed}`}
          alt="chevron"
        />
      </div>

      {dropdownOpen && (
        <ul className={`${styles.dropdownList}`}>
          {options
            .filter((o) => !selected.some((s) => s.label === o.label))
            .map((o, i) => (
              <li
                key={i}
                onClick={() => handleAddOption(o)}
                role="option">
                {o.emoji} {o.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
