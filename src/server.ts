import app from "./app";
import { envVars } from "./app/config/env";



const bootStrap = () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
   
    console.error("Error starting server:", error);
  }
};

bootStrap();