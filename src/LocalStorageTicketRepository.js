export class LocalStorageTicketRepository {
  constructor(storage, key = "northstar-support-tickets") {
    if (!storage) {
      throw new Error("A storage dependency is required.");
    }

    this.storage = storage;
    this.key = key;
  }

  getAll() {
    const savedTickets = this.storage.getItem(this.key);

    if (!savedTickets) {
      return [];
    }

    return JSON.parse(savedTickets);
  }

  save(ticket) {
    const tickets = this.getAll();

    if (tickets.some(item => item.id === ticket.id)) {
      throw new Error("A ticket with this reference already exists.");
    }

    tickets.push(ticket);

    this.storage.setItem(
      this.key,
      JSON.stringify(tickets)
    );

    return ticket;
  }

  findByIdAndEmail(ticketId, email) {
    const tickets = this.getAll();

    return tickets.find(ticket =>
      ticket.id.toLowerCase() === ticketId.trim().toLowerCase() &&
      ticket.email.toLowerCase() === email.trim().toLowerCase()
    ) || null;
  }
}