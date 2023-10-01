import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";
import Note from "../Note/Note.jsx";

export default function Home() {
  const [notes, setNotes] = useState([]);
  async function addNote(values) {
    let { data } = await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Opps Can't add note",
          text: err.response.data.msg + "!",
        });
      });

    Swal.fire({
      icon: "success",
      title: "Note Added Successfully",
      text: data.msg + "!",
    });
    getAllNotes()
  }

  async function getAllNotes() {
    let { data } = await axios
      .get(
        `https://note-sigma-black.vercel.app/api/v1/notes
    `,
        {
          headers: {
            token: `
    3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });

    // console.log(data.notes);
    setNotes(data.notes);
  }

  let validationSchema = yup.object({
    title: yup.string().required("title is required"),
    content: yup.string().required("content is required"),
  });

  let formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema,
    onSubmit: addNote,
  });

  async function deleteNote(id) {
    let { data } = await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: { token: `3b8ny__${localStorage.getItem("token")}` },
      })
      .catch((err) => {
        console.log(err);
      });

    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row g-3">
          <div className="col-md-8 bg-white p-2 rounded-3">
            <div className="row g-3 ">
              {notes.length > 0
                ? notes.map((note) => (
                    <Note deleteNote={deleteNote} getAllNotes={getAllNotes} key={note._id} note={note} />
                  ))
                : ""}
            </div>
          </div>
          <div className="col-md-4">
            <div className="right">
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  className="form-control my-1"
                  placeholder="Title..."
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.title && formik.touched.title ? (
                  <p className="text-start text-danger fw-bold">
                    {formik.errors.title}
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="text"
                  className="form-control my-1"
                  placeholder="Content..."
                  name="content"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.content && formik.touched.content ? (
                  <p className="text-start text-danger fw-bold">
                    {formik.errors.content}
                  </p>
                ) : (
                  ""
                )}
                <button className="btn btn-primary fw-bold w-100" type="submit">
                  {" "}
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
