import { runNotesSeed } from "./notes.seed";

Promise.all([runNotesSeed()]).then(() => {
  console.log("✅ All Seeds completed");
})