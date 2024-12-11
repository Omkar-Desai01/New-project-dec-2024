import path from "path";
import { fileURLToPath } from "url";
import { URL } from "url";

// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== PATH MODULE EXAMPLES ====================

// Basic path operations
const filePath = path.join(__dirname, "hello.txt");
console.log("\n=== Basic Path Operations ===");
console.log("Current file:", __filename);
console.log("Current directory:", __dirname);
console.log("Joined path:", filePath);
// === Basic Path Operations ===
// Current file: E:\Codes\Node\New project dec 2024\path.js
// Current directory: E:\Codes\Node\New project dec 2024
// Joined path: E:\Codes\Node\New project dec 2024\hello.txt

// Path parsing
console.log("\n=== Path Parsing ===");
console.log("Base name:", path.basename(filePath)); // Returns the last portion of a path
console.log("Directory name:", path.dirname(filePath)); // Returns the directory name
console.log("File extension:", path.extname(filePath)); // Returns the extension
console.log("Parse full path:", path.parse(filePath)); // Returns an object with path details
// === Path Parsing ===
// Base name: hello.txt
// Directory name: E:\Codes\Node\New project dec 2024
// File extension: .txt
// Parse full path: {
//   root: 'E:\\',
//   dir: 'E:\\Codes\\Node\\New project dec 2024',
//   base: 'hello.txt',
//   ext: '.txt',
//   name: 'hello'
// }

// Path normalization and resolution
console.log("\n=== Path Normalization ===");
const messyPath = "/foo/bar//baz/./asdf/quux/..";
console.log("Normalized path:", path.normalize(messyPath)); // Cleans up path format
console.log("Resolved path:", path.resolve("temp", "foo")); // Resolves to absolute path
// === Path Normalization ===
// Normalized path: \foo\bar\baz\asdf
// Resolved path: E:\Codes\Node\New project dec 2024\temp\foo

// Path manipulation
console.log("\n=== Path Manipulation ===");
console.log("Join paths:", path.join("/foo", "bar", "baz")); // Joins path segments
console.log("Is absolute:", path.isAbsolute(filePath)); // Checks if path is absolute
console.log(
  "Relative path:",
  path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb")
);
// === Path Manipulation ===
// Join paths: \foo\bar\baz
// Is absolute: true
// Relative path: ..\..\impl\bbb

// Platform-specific separator
console.log("\n=== Platform Specifics ===");
console.log("Path separator:", path.sep); // \ on Windows, / on UNIX
console.log("Delimiter:", path.delimiter); // ; on Windows, : on UNIX
// === Platform Specifics ===
// Path separator: \
// Delimiter: ;

// ==================== URL MODULE EXAMPLES ====================

// Creating and parsing URLs
console.log("\n=== URL Operations ===");
const myURL = new URL("https://example.org/foo?param1=value1#hash");
console.log("Full URL:", myURL.href);
console.log("Protocol:", myURL.protocol);
console.log("Host:", myURL.host);
console.log("Pathname:", myURL.pathname);
console.log("Search params:", myURL.searchParams);
console.log("Hash:", myURL.hash);
// === URL Operations ===
// Full URL: https://example.org/foo?param1=value1#hash
// Protocol: https:
// Host: example.org
// Pathname: /foo
// Search params: URLSearchParams { 'param1' => 'value1' }
// Hash: #hash

// URL manipulation
console.log("\n=== URL Manipulation ===");
myURL.pathname = "/new-path";
myURL.searchParams.append("param2", "value2");
console.log("Modified URL:", myURL.href);
// === URL Manipulation ===
// Modified URL: https://example.org/new-path?param1=value1&param2=value2#hash

// File URLs
console.log("\n=== File URLs ===");
// Create a file URL using the absolute path to hello.txt
const absolutePath = path.resolve(__dirname, "hello.txt");
const fileUrl = new URL(`file://${absolutePath}`);
console.log("File path:", absolutePath);
console.log("File URL:", fileUrl.href);
try {
  console.log("File URL to path:", fileURLToPath(fileUrl));
} catch (error) {
  console.log("Error converting file URL:", error.message);
}

// === File URLs ===
// File path: E:\Codes\Node\New project dec 2024\hello.txt
// File URL to path: E:\Codes\Node\New project dec 2024\hello.txt

// URL Search Params
console.log("\n=== URL Search Params ===");
const params = new URLSearchParams("user=abc&query=xyz");
params.append("newParam", "123");
console.log("Search params string:", params.toString());
params.forEach((value, name) => {
  console.log(`${name}: ${value}`);
});

// === URL Search Params ===
// Search params string: user=abc&query=xyz&newParam=123
// user: abc
// query: xyz
// newParam: 123

// URL Resolution
console.log("\n=== URL Resolution ===");
const baseURL = new URL("https://example.org/base/");
const relativeURL = new URL("relative/path", baseURL);
console.log("Resolved URL:", relativeURL.href);

// === URL Resolution ===
// Resolved URL: https://example.org/base/relative/path

// URL Encoding/Decoding
console.log("\n=== URL Encoding/Decoding ===");
const encodedString = encodeURIComponent("Hello World! @#$%");
console.log("Encoded:", encodedString);
console.log("Decoded:", decodeURIComponent(encodedString));

// === URL Encoding/Decoding ===
// Encoded: Hello%20World!%20%40%23%24%25
// Decoded: Hello World! @#$%
