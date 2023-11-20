import React from "react";

import AppFunctional from "./AppFunctional";
import { render, fireEvent } from "@testing-library/react";

let up, down, left, right, reset;
let coordinates, steps;

const initialCoordinates = "Koordinatlar (2, 2)";
const initialSteps = "0 kere ilerlediniz";

function updateVariables() {
  up = document.getElementById("up");
  down = document.getElementById("down");
  right = document.getElementById("right");
  left = document.getElementById("left");
  reset = document.getElementById("reset");

  coordinates = document.getElementById("coordinates");
  steps = document.getElementById("steps");
}

function move() {
  fireEvent.click(up);
  fireEvent.click(left);
  fireEvent.click(down);
  fireEvent.click(down);
  fireEvent.click(right);
  fireEvent.click(right);
  fireEvent.click(up);
  fireEvent.click(up);

  return 8; // cnt Steps
}

beforeEach(() => {
  render(<AppFunctional />);
  updateVariables();
});

test("if component renders without a problem", () => {
  render(<AppFunctional />);
});

describe("coordinate tests", () => {
  test("initial value", () => {
    expect(coordinates.textContent).toBe(initialCoordinates);
  });

  test("value after movement", () => {
    move();
    expect(coordinates.textContent).toBe("Koordinatlar (3, 1)");
  });

  test("value after movement + reset", () => {
    move();
    fireEvent.click(reset);
    expect(coordinates.textContent).toBe(initialCoordinates);
  });

  test("if coordinate boundaries are respected", () => {
    fireEvent.click(left);
    fireEvent.click(left);
    expect(coordinates.textContent).toMatch(/\(1.*2\)$/);
    fireEvent.click(reset);

    fireEvent.click(right);
    fireEvent.click(right);
    expect(coordinates.textContent).toMatch(/\(3.*2\)$/);
    fireEvent.click(reset);

    fireEvent.click(up);
    fireEvent.click(up);
    expect(coordinates.textContent).toMatch(/\(2.*1\)$/);
    fireEvent.click(reset);

    fireEvent.click(down);
    fireEvent.click(down);
    expect(coordinates.textContent).toMatch(/\(2.*3\)$/);
    fireEvent.click(reset);
  });
});

describe("step count tests", () => {
  test("initial value", () => {
    expect(steps.textContent).toBe(initialSteps);
  });

  test("step count after movement", () => {
    const cntSteps = move();
    expect(steps.textContent).toBe(`${cntSteps} kere ilerlediniz`);
  });
});
