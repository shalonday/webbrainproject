import { render, screen } from "@testing-library/react";
import Search from "./Search";
import { describe, expect, test } from "vitest";

describe("Search input box", () => {

  test("Typing without having clicked on the search bar doesn't update the search bar input", () => {
    //render(<Search/>);
    throw new Error;
  });

  test("Search bar can be highlighted by clicking on it", () => {
    //render(<Search/>);
    throw new Error;
  });

  test("Search bar can be highlighted by tabbing to it", () => {
    //render(<Search/>);
    throw new Error;
  });

  test("Typing while the search bar is highlighted updates the text in it", () => {
    //render(<Search/>);
    throw new Error;
  });
  
  test("Pressing the Enter key while the input box is highlighted confirms the search", () => {
    //render(<Search/>);
    throw new Error;
  });

  // render(<App />);
  // const headingElement = screen.getByText(/learn react/i);
  // expect(headingElement).not.toBeInTheDocument();
    throw new Error;
});

test("After a user confirms the keyword they're searching for, the results are adequately highlighted", () => {
    throw new Error;
});

test("User can pick a highlighted skill and generate a path to it", () => {
	throw new Error;
});

test("User can pick a highlighted URL and generate a path to it", () => {
	throw new Error;
});

test("There is a way to redirect user to the path page", () => {
	throw new Error;
});