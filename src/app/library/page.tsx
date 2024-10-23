"use client";

import React, { useEffect, useState } from "react";
import Modal from "./components/Modal/Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkFolderExists } from "@/utils/helper";
import { Folder } from "@/utils/types";
import Link from "next/link";
import Loading from "../components/Loading/Loading";
import { useDispatch } from "react-redux";
import { addDescription } from "@/lib/store/features/description/descriptionSlice";
import { redirect } from "next/navigation";

const Library = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status, data: session } = useSession();
  const [title, setTitle] = useState("");
  const openModal = () => setIsModalOpen(true);
  const [errorExistFolder, setErrorExistFolder] = useState("");
  const [errorGetData, setErrorGetData] = useState("");
  const router = useRouter();
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setErrorExistFolder("");
  };
  const [folders, setFolder] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<string | null>();
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/getFolder");
      const folder = await res.json();

      setFolder(folder);
    } catch (error) {
      setIsLoading(false);
      setErrorGetData(
        "We have some problem with server. Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeFolder = async (id: string) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/removeFolder`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Failed to remove folder");
        return;
      }

      console.log("Folder removed successfully");

      setFolder((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== id)
      );
    } catch (error) {
      console.error("Error removing folder:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const createFromFetch = async () => {
    try {
      const bodyData = {
        title,
        user: session?.user?.email,
        flashcards: [],
      };

      if (!bodyData.title.trim()) {
        setErrorExistFolder("Title is empty");
        return;
      }

      const resFolderExists = await checkFolderExists(
        bodyData.title,
        bodyData.user
      );

      if (resFolderExists.folder) {
        console.error("Folder already exists");
        setErrorExistFolder("Folder already exists");
        setTitle("");
        return;
      }

      const response = await fetch("/api/folder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        console.error("Failed to create folder");
        setTitle("");
        return;
      }

      const newFolder = await response.json();
      console.log("Response from server:", newFolder);

      await fetchData();
      closeModal();
    } catch (err) {
      console.error("Error creating from fetch:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      removeFolder(id);
      setId(null);
    }
  }, [id]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="bg-primary min-h-screen flex-1  text-3vh p-2 sm:px-6 lg:px-8 max-w-10xl m-auto">
        <Loading />
      </main>
    );
  }

  if (!session) {
    return redirect("/");
  }

  return (
    <main className="custom-main">
      <div className="flex justify-start items-center ">
        <h1 className="text-white text-3xl font-bold  sm:text-4xl mr-5">
          Your Library
        </h1>

        <button
          className="bg-secondary  hover:bg-primaryHover text-white px-6 py-2 rounded shadow-md"
          onClick={openModal}
        >
          Create folder
        </button>
      </div>

      <div className="bg-white w-full h-1 rounded my-5"></div>

      {errorGetData && <p className="text-red-500 text-sm">{errorGetData}</p>}

      {isLoading && <Loading />}

      {!isLoading && (
        <ul className="mt-4 flex gap-5 flex-col">
          {folders.map((folder) => (
            <div key={folder.id} className="flex justify-start  h-max ">
              <Link
                href={`/library/${folder.title}`}
                onClick={() =>
                  dispatch(addDescription(folder?.description ?? ""))
                }
                className="rounded cursor-pointer text text-lg text-primary hover:bg-secondary hover:border-mainText font-bold border-2 border-white bg-mainText p-4 w-full sm:w-1/2  flex justify-between items-center h-full rounded-r-none"
              >
                <li className="w-full">
                  <p className="flex-grow">{folder.title}</p>
                  <p>Created: {folder.createdAt}</p>
                  {folder.description && <p>{folder.description}</p>}
                </li>
              </Link>
              <div
                className="w-10 p-4  flex items-center justify-center cursor-pointer bg-red-500 rounded border-2 border-white border-l-0 rounded-l-none hover:bg-red-600  "
                onClick={() => setId(folder.id)}
              >
                <span className="text-white text-1xl">x</span>
              </div>
            </div>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-2">Create a new folder</h2>
        <input
          placeholder="Title"
          className="rounded border-2 border-secondary w-full p-2"
          value={title}
          onChange={(e) => {
            setErrorExistFolder("");
            setTitle(e.target.value);
          }}
        />

        <div className="flex justify-between flex-col md:flex-row">
          <button
            onClick={createFromFetch}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover "
          >
            Create folder
          </button>
          <button
            onClick={closeModal}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Close Modal
          </button>
        </div>
        <p className="text-red-500 mt-3 text-center">{errorExistFolder}</p>
      </Modal>
    </main>
  );
};

export default Library;
