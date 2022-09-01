import "dotenv/config";
import "./db.ts";
import app from "./server";
import "./models/Video.ts";
import "./models/User.ts";
import "./models/Comment";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
