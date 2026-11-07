
# Northstar Customer Support Portal

A customer support portal that allows customers to view support information, submit support requests, receive unique ticket reference numbers, and track their submitted tickets.

## Project Features

### Sprint 1
- Customer support contact information.
- Support operating hours.
- Order status FAQ.
- Billing support escalation information.

### Sprint 2 – Submit a Support Request
- Customers can enter their name and email address.
- Customers can optionally provide their order number.
- Customers can select an issue category.
- Customers can describe their problem.
- Required information and email addresses are validated.
- A unique ticket reference is generated.
- Submitted tickets are stored in browser Local Storage.
- New tickets receive an initial status of Open.

### Sprint 2 – Track a Support Request
- Customers can enter their ticket reference.
- Customers must provide their registered email address.
- Matching ticket details are displayed.
- Invalid ticket references are rejected.
- Incorrect email addresses cannot retrieve ticket information.

## Prerequisites

Install the following software:

- Node.js
- npm
- Visual Studio Code
- Google Chrome or another modern web browser
- Live Server extension for Visual Studio Code

## Installation

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open the integrated terminal.
4. Make sure the terminal is in the project root directory.
5. Install the project dependencies:

   ```bash
   npm install
   ```

## Run the Application

1. Open the project in Visual Studio Code.
2. In the Explorer panel, right-click `index.html`.
3. Select Open with Live Server.
4. The application will open in your browser.

## How to Submit a Support Request

1. Open the Northstar Customer Support Portal.
2. Scroll to Submit a Support Request.
3. Enter your full name.
4. Enter your email address.
5. Enter your order number if applicable.
6. Select an issue category.
7. Describe your problem.
8. Click Submit Support Request.
9. Save the displayed ticket reference number.

A successful submission displays a confirmation message and stores the ticket in browser Local Storage.

## How to Track a Support Request

1. Scroll to Track Your Support Request.
2. Enter the ticket reference received during submission.
3. Enter the same email address used when submitting the request.
4. Click Track Support Request.
5. Review the displayed ticket information and current status.

An invalid reference or an incorrect email address produces an error message.

## Automated Testing

This project uses Vitest for automated testing.

To install dependencies, run this command from the project root:

```bash
npm install
```

To execute all automated tests, run:

```bash
npm test
```

The automated test files are located inside the `tests/` directory.

Current test coverage includes:

- Ticket input validation.
- Successful ticket creation.
- Invalid ticket submissions.
- Dependency requirements.
- Ticket storage and retrieval.
- Duplicate ticket reference rejection.
- Ticket lookup using reference and email.
- Invalid ticket lookup cases.

## Project Structure

```text
support-portal/
│
├── index.html
├── styles.css
├── README.md
├── .gitignore
├── handoff-notes.md
├── support-checklist.md
├── package.json
├── package-lock.json
│
├── src/
│   ├── app.js
│   ├── TicketValidator.js
│   ├── TicketService.js
│   └── LocalStorageTicketRepository.js
│
└── tests/
    ├── TicketValidator.test.js
    ├── TicketService.test.js
    └── LocalStorageTicketRepository.test.js
```

## SOLID Principles

The following principles are applied in the Sprint 2 implementation:

### Single Responsibility Principle
Ticket validation is separated into `TicketValidator.js`, while ticket management and storage are handled by dedicated components.

### Dependency Inversion Principle
`TicketService.js` receives its repository dependency through its constructor instead of creating a specific storage implementation internally. This allows the repository to be replaced with a different implementation or a fake during testing.

## Known Limitations

- Ticket information is stored in the browser's Local Storage.
- Tickets are accessible only in the browser and device where they were submitted.
- The application does not currently use a centralized backend or database.
- Clearing browser storage may permanently remove saved tickets.
- The application does not currently send real emails or notifications to customers or support staff.
- Ticket statuses are not updated by a real support team.

## Support Escalation

Escalate unresolved billing requests to the billing team after one business day.

## Repository

https://github.com/Ashujha2002/support-portal
