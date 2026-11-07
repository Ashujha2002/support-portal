
import { describe, it, expect, vi } from "vitest";

import { TicketService } from "../src/TicketService.js";

describe("TicketService", () => {

  it("creates and saves a valid support ticket", () => {

    const repository = {
      save: vi.fn(ticket => ticket)
    };

    const service = new TicketService(repository, {
      idGenerator: () => "NST-TEST-001",
      clock: () => new Date("2026-11-08T10:00:00.000Z")
    });

    const ticket = service.createTicket({
      name: "John Smith",
      email: "JOHN@example.com",
      orderNumber: "ORD-1001",
      category: "Order Issue",
      description: "My order has not arrived."
    });

    expect(ticket.id).toBe("NST-TEST-001");
    expect(ticket.email).toBe("john@example.com");
    expect(ticket.status).toBe("Open");

    expect(repository.save).toHaveBeenCalledOnce();
    expect(repository.save).toHaveBeenCalledWith(ticket);
  });

  it("rejects invalid information without saving a ticket", () => {

    const repository = {
      save: vi.fn()
    };

    const service = new TicketService(repository);

    expect(() => {
      service.createTicket({
        name: "",
        email: "invalid",
        category: "",
        description: ""
      });
    }).toThrow();

    expect(repository.save).not.toHaveBeenCalled();
  });

  it("requires a repository dependency", () => {

    expect(() => {
      new TicketService(null);
    }).toThrow("A ticket repository is required.");

  });

  it("finds an existing ticket using reference and email", () => {

    const ticket = {
      id: "NST-TEST-001",
      name: "John Smith",
      email: "john@example.com",
      status: "Open"
    };

    const repository = {
      findByIdAndEmail: vi.fn(() => ticket)
    };

    const service = new TicketService(repository);

    const result = service.findTicket(
      "NST-TEST-001",
      "JOHN@example.com"
    );

    expect(result).toEqual(ticket);

    expect(repository.findByIdAndEmail).toHaveBeenCalledWith(
      "NST-TEST-001",
      "john@example.com"
    );
  });

  it("returns null when a ticket is not found", () => {

    const repository = {
      findByIdAndEmail: vi.fn(() => null)
    };

    const service = new TicketService(repository);

    const result = service.findTicket(
      "NST-INVALID",
      "john@example.com"
    );

    expect(result).toBeNull();
  });

  it("returns null when tracking information is missing", () => {

    const repository = {
      findByIdAndEmail: vi.fn()
    };

    const service = new TicketService(repository);

    expect(service.findTicket("", "john@example.com")).toBeNull();

    expect(service.findTicket("NST-TEST-001", "")).toBeNull();

    expect(repository.findByIdAndEmail).not.toHaveBeenCalled();
  });

});
