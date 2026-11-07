import { validateTicketInput } from "./TicketValidator.js";

export class TicketService {
  constructor(repository, options = {}) {
    if (!repository) {
      throw new Error("A ticket repository is required.");
    }

    this.repository = repository;

    this.idGenerator = options.idGenerator ||
      (() => {
        return `NST-${crypto.randomUUID()}`;
      });

    this.clock = options.clock || (() => new Date());
  }

  createTicket(input) {
    const validation = validateTicketInput(input);

    if (!validation.valid) {
      throw new Error(validation.errors.join(" "));
    }

    const ticket = {
      id: this.idGenerator(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      orderNumber: (input.orderNumber || "").trim(),
      category: input.category.trim(),
      description: input.description.trim(),
      status: "Open",
      createdAt: this.clock().toISOString()
    };

    this.repository.save(ticket);

    return ticket;
  }
}