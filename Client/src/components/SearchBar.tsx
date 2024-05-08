import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  onClearSearch: () => void;
}

function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}: SearchBarProps) {
  return (
    <div className="flex w-96 items-center rounded-md bg-slate-100 px-4">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full bg-transparent py-[11px] text-xs outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <X
          size={20}
          className="cursor-pointer text-slate-500 transition-all duration-200 hover:text-black"
          onClick={onClearSearch}
        />
      )}

      <Search
        size={20}
        className="duration-2 cursor-pointer text-slate-400 transition-all hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
