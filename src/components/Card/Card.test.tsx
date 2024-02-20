import { Result } from "@/types";
import { Card } from ".";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Card", () => {
  const value: Result = {
    Title: "A Film",
    Year: "1989",
    imdbID: "some-id",
    Type: "Series",
    Poster: "some poster",
  };
  it("should display the card with all data", () => {
    render(<Card open={true} setOpen={vitest.fn()} value={value} />);

    expect(screen.getByText("A Film")).toBeInTheDocument();
    expect(screen.getByText("1989")).toBeInTheDocument();

    expect(screen.queryByText("Missing Poster")).not.toBeInTheDocument();
  });

  it("should display Missing Poster when none is found", () => {
    render(
      <Card
        open={true}
        setOpen={vitest.fn()}
        value={{ ...value, Poster: "N/A" }}
      />
    );

    expect(screen.getByText("Missing Poster")).toBeInTheDocument();
  });
  it("should add the open class on click", async () => {
    render(
      <Card
        open={true}
        setOpen={vitest.fn()}
        value={{ ...value, Poster: "N/A" }}
      />
    );
    const user = userEvent.setup();

    const button = screen.getByRole("button");
    await user.click(button);
    expect(button.firstChild).toHaveClass("wrapper open");
  });
});
