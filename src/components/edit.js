import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NotesContext } from "../context/context";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import "./edit.css";
import { db } from "../firebase-config";

const Edit = () => {
  const { noteId, setNoteId } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notesCollection = doc(db, "notes", noteId);
    await updateDoc(notesCollection, {
      title,
      body,
      tags,
    });
    console.log("submit");
    window.location.reload();
  };

  useEffect(() => {
    {
      if (noteId) {
        const snapDoc = doc(db, "notes", noteId);
        const data = getDoc(snapDoc).then((doc) => {
          console.log(doc.data());
          setTitle(doc.data().title);
          setBody(doc.data().body);
          setTags(doc.data().tags);
        });
        // console.log(data);
      }
    }
  }, [noteId]);
  return (
    <div>
      {noteId && (
        <div class="popup w-full ">
          <form
            onSubmit={handleSubmit}
            class="bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div class="mb-4">
              <label
                class="block text-white-700 text-sm font-bold mb-2"
                for="Title"
              >
                Title
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-white-700 text-sm font-bold mb-2"
                for="Body"
              >
                Body
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Body"
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-white-700 text-sm font-bold mb-2"
                for="Tags"
              >
                Tags
              </label>
              <input
                class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="Submit"
              >
                Submit
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  setNoteId("");
                  setBody("");
                  setTitle("");
                  setTags("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
