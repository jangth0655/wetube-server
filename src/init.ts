import "dotenv/config";
import "./db.ts";
import app from "./server";
import "./models/Video.ts";
import "./models/User.ts";

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
