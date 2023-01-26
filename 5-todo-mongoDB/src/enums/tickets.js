/* Egen mapp + fil m dessa utanför schema pga kan inte exportera/importera från schema, 
och vi vill kunna ha dessa importerbara så vi minskar risk för skriva fel, 
samt får hjälp av vscode att fylla i.*/
// Syntax för att skriva enums: ALL_CAPS, samt UNDERSCORE_MELLAN_ORD

exports.ticketType = {
  BUG: "BUG",
  NEW_FEATURE: "NEW_FEATURE",
  OTHER: "OTHER",
};

exports.ticketPriority = {
  CRITICAL: "CRITICAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
};

exports.ticketStatus = {
  NEW: "NEW",
  IN_DEVELOPMENT: "IN_DEVELOPMENT",
  IN_REVIEW: "IN_REVIEW",
  READY_FOR_TEST: "READY_FOR_TEST",
  COMPLETED: "COMPLETED",
};
