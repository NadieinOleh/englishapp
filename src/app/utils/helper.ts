export const checkUserExists = async (email: string) => {
  try {
    const response = await fetch("/api/userExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // Check if the response status is OK (i.e., 2xx)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Parse JSON response
    const result = await response;
    return result;
  } catch (error) {
    console.error("Error in checkUserExists:", error);
    throw error; // Re-throw error for handling in the calling function
  }
};
