import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup directory and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "hello.txt");

// ==================== FILE SYSTEM OPERATIONS ====================

// 1. Writing Files
console.log("\n=== Writing Files ===");
async function writeExamples() {
  try {
    // Write file (creates new or overwrites existing)
    await fs.writeFile(filePath, "Hello World!\n");
    console.log("File written successfully");

    // Append to file
    await fs.appendFile(filePath, "Appended content\n");
    console.log("Content appended successfully");

    // Write with options
    await fs.writeFile(filePath, "New content with encoding\n", {
      encoding: "utf8",
      flag: "a", // 'a' for append, 'w' for write
    });
    console.log("Written with options");
  } catch (error) {
    console.error("Writing error:", error.message);
  }
}

// 2. Reading Files
console.log("\n=== Reading Files ===");
async function readExamples() {
  try {
    // Read entire file
    const content = await fs.readFile(filePath, "utf8");
    console.log("File content:", content);

    // Read file stats
    const stats = await fs.stat(filePath);
    console.log("File stats:", {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      isFile: stats.isFile(),
    });
  } catch (error) {
    console.error("Reading error:", error.message);
  }
}

// 3. File Management
console.log("\n=== File Management ===");
async function fileManagement() {
  try {
    // Check if file exists
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);
    console.log("File exists:", exists);

    // Create temporary file
    const tempPath = path.join(__dirname, "temp.txt");
    await fs.writeFile(tempPath, "Temporary content");

    // Copy file
    const copyPath = path.join(__dirname, "hello-copy.txt");
    await fs.copyFile(filePath, copyPath);
    console.log("File copied successfully");

    // Rename/Move file
    const newPath = path.join(__dirname, "hello-renamed.txt");
    await fs.rename(copyPath, newPath);
    console.log("File renamed successfully");

    // Delete files
    await fs.unlink(tempPath);
    await fs.unlink(newPath);
    console.log("Temporary files cleaned up");
  } catch (error) {
    console.error("File management error:", error.message);
  }
}

// 4. Directory Operations
console.log("\n=== Directory Operations ===");
async function directoryOperations() {
  try {
    // Create directory
    const dirPath = path.join(__dirname, "test-dir");
    await fs.mkdir(dirPath, { recursive: true });
    console.log("Directory created");

    // Read directory contents
    const files = await fs.readdir(__dirname);
    console.log("Directory contents:", files);

    // Remove directory
    await fs.rmdir(dirPath);
    console.log("Directory removed");
  } catch (error) {
    console.error("Directory operation error:", error.message);
  }
}

// Execute all examples
async function runExamples() {
  console.log("Starting File System Operations Demo");
  await writeExamples();
  await readExamples();
  await fileManagement();
  await directoryOperations();
  console.log("\nFile System Operations Demo Completed");
}

// Run the examples
runExamples().catch((error) => {
  console.error("Main error:", error.message);
});

// Example output comments:
/*
=== Writing Files ===
File written successfully
Content appended successfully
Written with options

=== Reading Files ===
File content: Hello World!
Appended content
New content with encoding

File stats: {
  size: 45,
  created: 2024-03-14T10:30:00.000Z,
  modified: 2024-03-14T10:30:00.000Z,
  isFile: true
}

=== File Management ===
File exists: true
File copied successfully
File renamed successfully
Temporary files cleaned up

=== Directory Operations ===
Directory created
Directory contents: [
  'hello.txt',
  'index.html',
  'index.js',
  'package.json',
  'path.js',
  'write.js'
]
Directory removed
*/
