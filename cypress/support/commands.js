Cypress.Commands.add("moveIssue", (sourceIssueNumber, targetIssueNumber) => {
  const dataTransfer = new DataTransfer();

  let kanbanX, kanbanY;
  let issueX, issueY;

  cy.get(".kanban")
    .then(($element) => {
      const { x, y } = $element[0].getBoundingClientRect();

      kanbanX = x;
      kanbanY = y;

      return cy.get(`[data-issue-number="${sourceIssueNumber}"]`);
    })
    .then(($element) => {
      const { x, y } = $element[0].getBoundingClientRect();

      issueX = x;
      issueY = y;
    })
    .then(() => {
      cy.get(".kanban").trigger("dragstart", issueX - kanbanX, issueY - kanbanY, {
        dataTransfer,
      });

      cy.get(`[data-issue-number="${targetIssueNumber}"]`).trigger("drop", { dataTransfer });
    });
});
