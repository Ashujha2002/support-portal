export function validateTicketInput(input = {}) {
  const errors = [];

  const name = (input.name || "").trim();
  const email = (input.email || "").trim();
  const category = (input.category || "").trim();
  const description = (input.description || "").trim();

  if (!name) {
    errors.push("Customer name is required.");
  }

  if (!email) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!category) {
    errors.push("Please select an issue category.");
  }

  if (!description) {
    errors.push("Issue description is required.");
  } else if (description.length < 10) {
    errors.push("Description must contain at least 10 characters.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}