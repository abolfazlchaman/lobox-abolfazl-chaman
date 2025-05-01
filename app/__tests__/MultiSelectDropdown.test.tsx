import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import { render, screen, fireEvent } from "@testing-library/react";

test("should add and remove options", () => {
  const setOptionsMock = jest.fn();

  const options = [
    { label: "Education", emoji: "🎓" },
    { label: "Yeeeah, science!", emoji: "🧪" },
    { label: "Art", emoji: "🎨" },
    { label: "Sport", emoji: "⚽" },
    { label: "Games", emoji: "🎮" },
    { label: "Health", emoji: "🏥" },
  ];

  render(
    <MultiSelectDropdown
      options={options}
      setOptions={setOptionsMock}
      onChange={jest.fn()}
    />,
  );

  // Open the dropdown (simulate typing or clicking the input)
  fireEvent.click(screen.getByPlaceholderText("Type or select..."));

  // Use regex to match the text, to handle any possible split text or extra spaces
  const option = screen.getByText(/Yeeeah, science!/i);
  fireEvent.click(option);

  // Simulate a "removal" action (we'll remove the option by clicking it again)
  fireEvent.click(option);

  // Ensure setOptionsMock was called with the updated list of options
  expect(setOptionsMock).toHaveBeenCalledWith(
    expect.arrayContaining([
      { label: "Education", emoji: "🎓" },
      { label: "Art", emoji: "🎨" },
      { label: "Sport", emoji: "⚽" },
      { label: "Games", emoji: "🎮" },
      { label: "Health", emoji: "🏥" },
    ]),
  );
});
