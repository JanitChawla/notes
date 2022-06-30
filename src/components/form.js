// import "./App.css";

import { useContext } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";
import { NotesContext } from "../context/context";

export default function Form({ fetchData }) {
  const { title, setTitle, body, setBody, tags, setTags } =
    useContext(NotesContext);

  const notesCollection = collection(db, "notes");
  const submit = async (e) => {
    e.preventDefault();

    await addDoc(notesCollection, { body: body, title: title, tags: tags });
    console.log("submit");
    setBody("");
    setTitle("");
    setTags("");
    fetchData();
  };
  return (
    <div class="max-w-md md:w-fit lg:w-full ">
      <form
        onSubmit={submit}
        class="bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="flex font-semibold text-2xl mb-8">
          Take Your Notes Here{"    "}
        </h1>
        <div class="mb-8">
          {/* <label
            class="block text-white-700 text-sm font-bold mb-2"
            for="Title"
          >
            Title
          </label> */}
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            required
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-4">
          {/* <label class="block text-white-700 text-sm font-bold mb-2" for="Body">
            Body
          </label> */}
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="Body"
            type="text"
            required
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="Tags"
            type="text"
            placeholder="Tags"
            value={tags}
            required
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="mt-5 sm:mt-8 sm:flex justify-center ">
          <div className="transition ease-in-out delay-50 duration-200 hover:scale-105 p-0.5 bg-gradient-to-l from-magenta-500 via-fuchsia-500 to-violet-500 rounded-tl-xl rounded-br-xl ">
            <div className="rounded-tl-xl rounded-br-xl shadow">
              <button className="w-full submit bg-black hover:bg-dark-700 flex items-center justify-center px-12 py-3 border border-transparent text-base font-medium rounded-tl-xl rounded-br-xl text-white border-2 md:py-4 md:text-lg md:px-16 font-montserrat">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
