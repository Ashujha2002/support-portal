
# Developer handoff notes

## What I delivered
I created a static Northstar Customer Support page with contact details, support hours, an order-number reminder, and an FAQ explaining where customers can find order status. I also added a customer support verification checklist.

## How I verified the page
- Confirmed that the page title and contact email are visible.
- Confirmed that support hours specify Central Time.
- Confirmed that the order-number reminder and order-status FAQ appear on the page.
- Checked that the page styling loads in the browser.
- Narrow-window readability: [Record the result after testing a narrow browser window.]

## Remote change I received
The README was updated on GitHub with a Support escalation section explaining that unresolved billing requests should be escalated to the billing team after one business day. I received the change using `git pull --ff-only origin main`.

## Git workflow explanation
A commit records staged changes in the local Git history. It does not automatically upload them to GitHub. The `git push` command sends local commits to the remote repository so others can access them.
