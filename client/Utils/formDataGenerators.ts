import { faker } from "@faker-js/faker"

export function generateTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); 
};

export function generateToDo(): string {
  const timestamp = generateTimestamp();
  return `todo_${timestamp}`;
};

export function generateSecondToDo(): string {
  const timestamp = generateTimestamp();
  return `second_todo_${timestamp}`;
};
