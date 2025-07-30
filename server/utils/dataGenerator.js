export function generateTodo() {
  return `todo-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
