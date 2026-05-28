import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, "../node_modules/@fe-daily/libimagequant-wasm/dist/wasm/libimagequant_wasm_bg.wasm");
const dest = path.join(__dirname, "../public/wasm/libimagequant_wasm_bg.wasm");

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log("Copied libimagequant WASM to public/wasm/");
