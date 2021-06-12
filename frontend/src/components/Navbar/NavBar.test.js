import { render } from "@testing-library/react";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  test("should have correct title", () => {
    const { getByTestId } = render(<NavBar />);
    const brandLinkEl = getByTestId("brand-link");
    expect(brandLinkEl.textContent).toBe("Bolttech TODO List");
  });
});
