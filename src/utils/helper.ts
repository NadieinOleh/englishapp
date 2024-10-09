import { Console } from "console";

export const checkUserExists = async (email: string) => {
  try {
    const response = await fetch("/api/userExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in checkUserExists:", error);
    throw error; 
  }
};
export const checkFolderExists = async (title: string) => {
  try {
    const response = await fetch("/api/folderExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in checkUserExists:", error);
    throw error; 
  }
};
