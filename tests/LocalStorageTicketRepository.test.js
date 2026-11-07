import { describe, it, expect } from "vitest";

import {
  LocalStorageTicketRepository
} from "../src/LocalStorageTicketRepository.js";

function createFakeStorage() {
  const data = new Map();

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },

    setItem(key, value) {
      data.set(key, value);
    }
  };
}

describe("LocalStorageTicketRepository", () => {

  it("saves and retrieves a ticket", () => {
    const storage = createFakeStorage();

    const repository =
      new LocalStorageTicketRepository(storage);

    const ticket = {
      id: "NST-TEST-001",
      name: "John Smith",
      email: "john@example.com",
      status: "Open"
    };

    repository.save(ticket);

    expect(repository.getAll()).toEqual([ticket]);
  });

  it("finds a ticket using its reference and email", () => {
    const storage = createFakeStorage();

    const repository =
      new LocalStorageTicketRepository(storage);

    const ticket = {
      id: "NST-TEST-002",
      name: "John Smith",
      email: "john@example.com",
      status: "Open"
    };

    repository.save(ticket);

    expect(
      repository.findByIdAndEmail(
        "NST-TEST-002",
        "JOHN@example.com"
      )
    ).toEqual(ticket);
  });

  it("rejects duplicate ticket references", () => {
    const storage = createFakeStorage();

    const repository =
      new LocalStorageTicketRepository(storage);

    const ticket = {
      id: "NST-TEST-003",
      name: "John Smith",
      email: "john@example.com"
    };

    repository.save(ticket);

    expect(() => repository.save(ticket)).toThrow(
      "A ticket with this reference already exists."
    );
  });

});