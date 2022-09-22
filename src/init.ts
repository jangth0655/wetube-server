import "dotenv/config";
import app from "./server";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
