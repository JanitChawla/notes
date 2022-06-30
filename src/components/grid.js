import React from "react";
import { useContext } from "react";
import { NotesContext } from "../context/context";
import { doc, deleteDoc } from "@firebase/firestore";
import { db } from "../firebase-config";
// import Pagination from "./pagination";

const Grid = ({ note, fetchData }) => {
  const { setNoteId } = useContext(NotesContext);

  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    fetchData();
  };
  return (
    <div
      id="main"
      class="grid h-2.5 lg:grid-cols-2 md:grid-cols-1 mr-16 gap-7 justify-evenly"
    >
      {note.map((note) => (
        <div class="p-6 max-w-sm bg-white rounded-lg text-left custom-border border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {note.title}
            </h5>
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {note.body}
          </p>
          <p class="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
            #{note.tags}
          </p>
          <button
            onClick={() => {
              // setNoteId(note.id);
              // console.log(note.id);
              setNoteId(note.id);
              // console.log(noteId);
            }}
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Edit Note
            <svg
              class="ml-1 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="ml-4 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 "
          >
            Delete Note
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Grid;
