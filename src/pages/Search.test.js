import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Search from "./Search";

describe("Search input box", () => {

    test("Typing without having clicked on the search bar doesn't update the search bar input", () => {
    //Render(<Search/>);
        throw new Error;
    });

    test("Search bar can be highlighted by clicking on it", () => {
    //Render(<Search/>);
        throw new Error;
    });

    test("Search bar can be highlighted by tabbing to it", () => {
    //Render(<Search/>);
        throw new Error;
    });

    test("Typing while the search bar is highlighted updates the text in it", () => {
    //Render(<Search/>);
        throw new Error;
    });
  
    test("Pressing the Enter key while the input box is highlighted confirms the search", () => {
    //Render(<Search/>);
        throw new Error;
    });

    // Render(<App />);
    // Const headingElement = screen.getByText(/learn react/i);
    // Expect(headingElement).not.toBeInTheDocument();
});

describe("Search Page Graph Display", () => {
    test("After a user confirms the keyword they're searching for, the resulting nodes are adequately highlighted", () => {
        throw new Error;
    });

    test("If there are no results, the user is informed", () => {
        throw new Error;
    });

    test("User can double click a skill node to select it", () => {
        throw new Error;
    });

    test("User can double click a URL node to select it", () => {
        throw new Error;
    });
});

describe("Search Page Text Results Display", () => {
    test("After a user confirms the keyword they're searching for, the results are displayed in text form", () => {
        throw new Error;
    });

    test("If there are no results, the user is informed", () => {
        throw new Error;
    });

    test("User can click on a skill description to select it", () => {
        throw new Error;
    });

    test("User can click on a URL result to select it", () => {
        throw new Error;
    });
});

describe("Generate Path Button", () => {
    test("Clicking on the button while a Skill or URL is selected leads user to the Branch page", () => {
        throw new Error;
    });

    test("Clicking on the button when there is nothing selected informs the user to select a Skill or URL first", () => {
        throw new Error;
    });
});