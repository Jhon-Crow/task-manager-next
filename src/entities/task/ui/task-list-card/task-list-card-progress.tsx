'use client'
import {useTimerContext} from "@/shared/hooks/useTimerContext";
import {getTaskCompletionPercentage} from "@/entities/task";
import {TypeTask} from "@/entities/task/model/types/task";

export const TaskListCardProgress = ({ task }: { task: TypeTask }) => {
    const now = useTimerContext();
    const percent = getTaskCompletionPercentage(task, now);
    return (
        <div
            className={`absolute left-0 top-0 bottom-0 bg-muted-foreground/10`}
            style={{ width: percent }}
        />
    );
};