import { formatTimeToRuShort } from "@/shared/lib/format/formatDayToRuShort";

export const TaskCardCreatedAt = ({ createdAt }: { createdAt: Date }) => (
  <span className="block text-right mt-2">
    {formatTimeToRuShort(createdAt)}
  </span>
);
