import { TicketService } from "./TicketService.js";
import { LocalStorageTicketRepository } from "./LocalStorageTicketRepository.js";

const repository = new LocalStorageTicketRepository(
  window.localStorage
);

const ticketService = new TicketService(repository);

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