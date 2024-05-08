import { Pencil, Pin, Trash } from "lucide-react";

interface NoteCardProps {
  title: string;
  date: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNote: () => void;
}

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}: NoteCardProps) {
  return (
    <div className="rounded border bg-white p-4 transition-all duration-200 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-semibold">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <Pin
          size={20}
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="mt-2 text-xs text-slate-600">{content?.slice(0, 60)}</p>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
          <Pencil
            size={20}
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <Trash
            size={20}
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
