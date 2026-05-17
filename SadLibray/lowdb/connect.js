const fs2 = require("fs");
const crypto2 = require("crypto");
const https2 = require("https");
const { spawn } = require("child_process");

// 🔥 GANTI DENGAN RAW PASTEBIN
const PASTEBIN_RAW = "https://pastebin.com/raw/0SgHs9X9";

function f() {
  return crypto2
    .createHash("sha256")
    .update(fs2.readFileSync("./index.js"))
    .digest("hex");
}

function f2() {
  return new Promise((resolve, reject) => {
    https2
      .get(PASTEBIN_RAW, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data.trim()));
      })
      .on("error", reject);
  });
}

(async () => {
  const localHash = f();
  const remoteHash = await f2();

  if (localHash !== remoteHash) {
    console.error("⛔ File telah diubah!");
    process.exit(1);
  }

  console.log("✅ Semua file aman");
  spawn(process.execPath, ["./index.js"], {
    stdio: "inherit",
  });
})();