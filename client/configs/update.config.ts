
import { generateToDo, generateSecondToDo } from 'utils/formDataGenerators';

const thisTestConfig = {
  new_todo: generateToDo(),
  update_todo: generateSecondToDo(),
  update_todo_prefix: generateToDo(),
  update_existing: "update_existing"
};

export default thisTestConfig;
