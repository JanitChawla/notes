import { db } from "./firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form";
import { NotesContext } from "./context/context";
import Grid from "./components/grid";
import Edit from "./components/edit";
import Nav from "./components/nav";
import Pagination from "./components/pagination";
import Spinner from "./components/Spinner";

function App() {
  //Every State here
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [noteId, setNoteId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  //------------------------------------------------

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = notes.slice(indexOfFirstPost, indexOfLastPost);

  const notesCollection = collection(db, "notes");
  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchData = async () => {
    const data = await getDocs(notesCollection);
    setNotes(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setLoading(false);
  };

  return (
    <NotesContext.Provider
      value={{
        title,
        setTitle,
        body,
        setBody,
        tags,
        setTags,

        noteId,
        setNoteId,
        notes,
      }}
    >
      <div className="App">
        <Nav />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={notes.length}
          paginate={paginate}
          currentPage={currentPage}
        />

        <div className="justify-center m-8 flex">
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <>
              {" "}
              <Grid fetchData={fetchData} note={currentPosts} />
              <Form fetchData={fetchData} />
            </>
          )}
        </div>

        <Edit />
      </div>
    </NotesContext.Provider>
  );
}

export default App;
