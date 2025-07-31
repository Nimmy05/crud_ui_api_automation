export function generateTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
}

export function generateToDo(): string {
  return `todo_${generateTimestamp()}`;
}

export function generateSecondToDo(): string {
  return `second_todo_${generateTimestamp()}`;
}
