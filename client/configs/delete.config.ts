
import { generateToDo, generateSecondToDo } from 'utils/formDataGenerators';

const thisTestConfig = {
    new_todo: "first_delete_todo_" + generateToDo(),
    second_todo: "second_delete_todo_" + generateSecondToDo(),
    
};

export default thisTestConfig;
