import { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.scss";

interface Option {
  label: string;
  emoji?: string;
}

interface Props {
  options: Option[];
  onChange: (selected: Option[]) => void;
}

export default function MultiSelectDropdown({ options, onChange }: Props) {
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

  function handleAddOption(option: Option) {
    if (!selected.some((s) => s.label === option.label)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    }
    setInput("");
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && input.trim()) {
      handleAddOption({ label: input.trim() });
    }
  }

  return (
    <div
      className={styles.container}
      ref={dropdownRef}>
      <div
        className={styles.inputWrapper}
        onClick={() => setDropdownOpen(true)}>
        {selected.map((s, i) => (
          <span
            key={i}
            className={styles.tag}>
            <button
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                const newSelected = selected.filter((_s, index) => index !== i);
                setSelected(newSelected);
                onChange(newSelected);
              }}>
              ×
            </button>
            &nbsp;
            {s.emoji} {s.label}
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type or select..."
        />
      </div>

      {dropdownOpen && (
        <ul className={styles.dropdown}>
          {options
            .filter((o) => !selected.some((s) => s.label === o.label))
            .map((o, i) => (
              <li
                key={i}
                onClick={() => handleAddOption(o)}>
                {o.emoji} {o.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
