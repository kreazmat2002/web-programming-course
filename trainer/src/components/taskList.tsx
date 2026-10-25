import { Task, Answer } from "../domain";

type TaskListProps = {
  tasks: readonly Task[];
  activeId: string | null;
  answers: readonly Answer[];
  onSelect: (id: string) => void;
};

function isTaskFilled(taskId: string, answers: readonly Answer[]): boolean {
  const ans = answers.find((a) => a.taskId === taskId);
  if (!ans) return false;
  if (ans.kind === "short-text") return ans.text.trim().length > 0;
  if (ans.kind === "single-choice") return !!ans.optionId;
  return false;
}

export function TaskList({ tasks, activeId, answers, onSelect }: TaskListProps) {
  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {tasks.map((task) => {
        const isCurrent = task.id === activeId;
        const isFilled = isTaskFilled(task.id, answers);

        return (
          <button
            key={task.id}
            onClick={() => onSelect(task.id)}
            type="button"
            style={{
              padding: "0.5rem 1rem",
              textAlign: "left",
              cursor: "pointer",
              backgroundColor: isCurrent ? "#e0e0e0" : "#fff",
              border: "1px solid #aaa",
              borderRadius: "4px",
              fontWeight: isCurrent ? "bold" : "normal",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <span>{task.topic}</span>


            {isFilled && <span style={{ color: "green", fontSize: "0.9rem" }}>+</span>}
          </button>
        );
      })}
    </nav>
  );
}
