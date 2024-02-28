import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Statistics from "../Statistics";

describe("<Statistics />", () => {
  it("Should render header", () => {
    render(<Statistics allTasks={[]} />);
    const heading = screen.getByRole("heading", { name: "Stats:" });
    expect(heading).toBeInTheDocument();
  });
});
