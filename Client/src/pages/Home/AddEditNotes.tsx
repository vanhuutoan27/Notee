import TagInput from "@/components/TagInput";
import { X } from "lucide-react";
import { useState } from "react";

interface AddEditNotesProps {}

function AddEditNotes({ noteData, type, onClose }: AddEditNotesProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {};

  // Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-50"
        onClick={onClose}
      >
        <X size={24} className="text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Learning Node.js"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label className="input-label">CONTENT</label>
        <textarea
          rows={10}
          placeholder="Content"
          className="rounded bg-slate-50 p-2 text-sm text-slate-950 outline-none"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="pt-4 text-xs text-red-500">{error}</p>}

      <button
        className="btn-primary mt-5 p-3 font-medium"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
}

export default AddEditNotes;
