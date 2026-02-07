import app from "./app";

const PORT = 5000;

const bootStrap = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
   
    console.error("Error starting server:", error);
  }
};

bootStrap();