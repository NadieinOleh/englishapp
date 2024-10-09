"use client";

import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { checkFolderExists } from "@/utils/helper";
import { Folder } from "@/utils/types";

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

      const resFolderExists = await checkFolderExists(bodyData.title);

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
        <div className="flex justify-center items-center min-h-screen">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite] text-secondary"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-primary min-h-screen flex-1  text-3vh p-2 sm:px-6 lg:px-8 max-w-10xl m-auto">
      <div className="flex justify-end">
        <button
          className="bg-secondary  hover:bg-primaryHover text-white px-6 py-2 rounded shadow-md"
          onClick={openModal}
        >
          Create folder
        </button>
      </div>

      {errorGetData && <p className="text-red-500 text-sm">{errorGetData}</p>}

      {isLoading && (
        <div className="flex justify-center align-center mt-7">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite] text-secondary"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!isLoading && (
        <ul className="mt-4">
          {folders.map((folder) => (
            <li
              className="rounded cursor-pointer text text-lg text-primary hover:bg-secondary hover:border-mainText font-bold border-2 border-white bg-mainText p-4 w-1/2 mb-5 flex justify-between items-center"
              key={folder.id}
            >
              <p className="flex-grow ">{folder.title}</p>
              <div
                className="relative w-5 h-5 flex items-center justify-center cursor-pointer"
                onClick={() => setId(folder.id)}
              >
                <div className="absolute w-full h-1 bg-primary transform rotate-45"></div>
                <div className="absolute w-full h-1 bg-primary transform -rotate-45"></div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-2">Create a new folder</h2>
        <input
          placeholder="Title"
          className="rounded border-2 border-secondary w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
