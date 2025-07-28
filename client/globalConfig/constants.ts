export const constants: any = {

  headings: {
    "todo_list": "Todo List"
  },
  button_texts: {
    "login": "Login",
    "add": "Add",
    "edit": "Edit",
    "delete": "Delete"
  },
  alert_texts: {
    "email_required": "Email is required",
    "password_required": "Password is required",
    "require_valid_email": "Please enter a valid email address",
    "required_both": "Email and Password are required",
    "wrong_credentials": "Please enter a valid email address",
    "not_exist": "No user exist with this email",
    "incorrect_password": "Incorrect password",
    "duplicate_to_do": "Error creating todo",
    "blank_todo": "Please enter a todo item before submitting.",
    "no_todos": "No todos found."
  },
  place_holder_texts: {
    "new_to_do": "Enter new todo"
  }
}

export const timeout: number = 5000;
export const baseURL = process.env.BASE_URL;
