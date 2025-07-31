import { generateToDo, generateSecondToDo } from '../utils/formDataGenerators';

const thisTestConfig = {
  new_todo: "firsttodo_create_" + generateToDo(),
  second_todo: "secondtodo_create_" + generateSecondToDo(),
};

export default thisTestConfig;
