import { describe, it, expect } from "vitest";

import {
  validateTicketInput
} from "../src/TicketValidator.js";

describe("TicketValidator", () => {

  it("accepts valid customer information", () => {
    const result = validateTicketInput({
      name: "John Smith",
      email: "john@example.com",
      category: "Order Issue",
      description: "I need help with my recent order."
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("rejects missing customer name", () => {
    const result = validateTicketInput({
      name: "",
      email: "john@example.com",
      category: "Order Issue",
      description: "I need help with my recent order."
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Customer name is required."
    );
  });

  it("rejects an invalid email address", () => {
    const result = validateTicketInput({
      name: "John Smith",
      email: "invalid-email",
      category: "Order Issue",
      description: "I need help with my recent order."
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Please enter a valid email address."
    );
  });

  it("rejects a description shorter than 10 characters", () => {
    const result = validateTicketInput({
      name: "John Smith",
      email: "john@example.com",
      category: "Order Issue",
      description: "Help"
    });

    expect(result.valid).toBe(false);
  });

});