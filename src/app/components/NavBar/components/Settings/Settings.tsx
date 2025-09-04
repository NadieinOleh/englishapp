import Image from "next/image";
import { FC, useState } from "react";
import { useSession } from "next-auth/react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose, avatar, setAvatar }) => {
  const [fileBase64, setFileBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const { data: session, update } = useSession();

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!fileBase64 || !fileName) return;

    const res = await fetch("/api/editAvatar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: fileBase64, fileName }),
    });

    const data = await res.json();
    if (data.success) {
      setAvatar(data.user.image);
      await update({ ...session?.user, image: data.user.image });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg mx-5  bg-white dark:bg-gray-800 p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-secondary dark:text-secondary">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <Image
            alt="Avatar"
            src={avatar}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        </div>

        <div className="space-y-4 mb-6 flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block text-sm text-gray-900 dark:text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-primary file:text-white
                       hover:file:bg-secondary"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={handleSave}
            className="w-full rounded-md bg-primary dark:bg-primaryDark px-3 py-2 text-white font-semibold hover:bg-primaryHover dark:hover:bg-primaryHoverDark"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
