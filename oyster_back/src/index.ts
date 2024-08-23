import app from "./app";
import { PORT, HOST } from "./utils/config";

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}:${HOST}`);
});
