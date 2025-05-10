import { formatDateToRuShort } from "@/shared/lib/format/formatDayToRuShort";

export const TaskCardCreatedAt = ({ createdAt }: { createdAt: Date }) => (
  <span className="block text-right mt-2">
    {formatDateToRuShort(createdAt)}
  </span>
);
