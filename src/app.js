
import { TicketService } from "./TicketService.js";
import { LocalStorageTicketRepository } from "./LocalStorageTicketRepository.js";

const repository = new LocalStorageTicketRepository(
  window.localStorage
);

const ticketService = new TicketService(repository);

// US-01: Submit support request
const requestForm = document.getElementById("requestForm");
const message = document.getElementById("formMessage");

requestForm.addEventListener("submit", event => {
  event.preventDefault();

  message.textContent = "";
  message.className = "";

  const formData = new FormData(requestForm);

  const input = {
    name: formData.get("name"),
    email: formData.get("email"),
    orderNumber: formData.get("orderNumber"),
    category: formData.get("category"),
    description: formData.get("description")
  };

  try {
    const ticket = ticketService.createTicket(input);

    message.textContent =
      `Your support request was submitted successfully. Your ticket reference is ${ticket.id}.`;

    message.className = "success-message";

    requestForm.reset();

  } catch (error) {
    message.textContent = error.message;
    message.className = "error-message";
  }
});

// US-02: Track support request
const trackingForm = document.getElementById("trackingForm");
const trackingMessage = document.getElementById("trackingMessage");

trackingForm.addEventListener("submit", event => {
  event.preventDefault();

  trackingMessage.textContent = "";
  trackingMessage.className = "";

  const formData = new FormData(trackingForm);

  const ticketId = formData.get("ticketId");
  const email = formData.get("trackingEmail");

  const ticket = ticketService.findTicket(ticketId, email);

  if (!ticket) {
    trackingMessage.textContent =
      "No support request was found. Please check your ticket reference and email address.";

    trackingMessage.className = "error-message";
    return;
  }

  trackingMessage.textContent =
    `Ticket Reference: ${ticket.id}\n` +
    `Customer Name: ${ticket.name}\n` +
    `Email: ${ticket.email}\n` +
    `Order Number: ${ticket.orderNumber || "Not provided"}\n` +
    `Issue Category: ${ticket.category}\n` +
    `Description: ${ticket.description}\n` +
    `Status: ${ticket.status}\n` +
    `Submitted: ${ticket.createdAt}`;

  trackingMessage.className = "success-message";
});
