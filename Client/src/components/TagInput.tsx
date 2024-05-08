import { Plus, X } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

function TagInput({ tags, setTags }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 rounded bg-slate-100 px-3 py-1 text-sm text-slate-900"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-4">
        <input
          type="text"
          value={inputValue}
          placeholder="Add tags"
          className="rounded border bg-transparent px-3 py-2 text-sm outline-none"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="flex h-8 w-8 items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <Plus size={20} className="text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
