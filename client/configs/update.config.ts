import { generateToDo, generateSecondToDo } from '../utils/formDataGenerators';

const thisTestConfig = {
  new_todo: "first_update_todo_" +generateToDo(),
  update_todo: "second_update_todo_" +generateSecondToDo(),
  update_todo_prefix: generateToDo(),
  update_existing: 'update_existing',
};

export default thisTestConfig;
