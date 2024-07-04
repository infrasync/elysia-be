import { runPostsSeed } from "./posts.seed";
import { runUsersSeed } from "./users.seed";

Promise.all([runPostsSeed(), runUsersSeed()]).then(() => {
  console.log("✅ All Seeds completed");
})