import Navbar from "@/components/Navbar";
import NoteCard from "@/components/NoteCard";
import { Plus } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";

function Home() {
  const userInfo = JSON.parse(localStorage.getItem("userData") || "{}");

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto">
        <div className="mt-8 grid grid-cols-3 gap-4">
          <NoteCard
            title="Meeting on 7th May"
            date="7th May 2024"
            content="The Shad Team Meeting"
            tags={["#Meeting", "#Shad Team"]}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary transition-all duration-200 hover:bg-blue-600"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", date: null });
        }}
      >
        <Plus size={20} className="text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="max-h-3/4 mx-auto mt-14 w-[40%] overflow-hidden rounded-md bg-white p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            })
          }
        />
      </Modal>
    </>
  );
}

export default Home;
