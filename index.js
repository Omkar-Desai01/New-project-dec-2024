import http from "http";
import { fileURLToPath } from "url";
import path from "path";

// Setup directory and file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== HTTP METHODS EXAMPLES ====================

// Basic HTTP server setup
const PORT = process.env.PORT || 3000;
const server = http.createServer();

// Store some dummy data for demonstration
let users = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

// Helper function to parse JSON body from requests
const getRequestBody = async (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    // Handle request timeout
    const timeout = setTimeout(() => {
      reject(new Error("Request timeout"));
    }, 5000); // 5 seconds timeout

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      clearTimeout(timeout);
      try {
        // Check if body is empty
        if (!body) {
          reject(new Error("Empty request body"));
          return;
        }
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (error) {
        reject(new Error("Invalid JSON format"));
      }
    });

    req.on("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
};

// Handle different HTTP methods
server.on("request", async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Check Content-Type for POST, PUT, PATCH requests
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Content-Type must be application/json",
        })
      );
      return;
    }
  }

  // Extract route and ID from URL
  const route = req.url.split("/")[1];
  const id = req.url.split("/")[2];

  try {
    // Route handler for /users endpoint
    if (route === "users") {
      switch (req.method) {
        case "GET":
          // GET /users - Get all users
          if (!id) {
            res.writeHead(200);
            res.end(JSON.stringify(users));
          }
          // GET /users/:id - Get user by ID
          else {
            const user = users.find((u) => u.id === parseInt(id));
            if (user) {
              res.writeHead(200);
              res.end(JSON.stringify(user));
            } else {
              res.writeHead(404);
              res.end(JSON.stringify({ error: "User not found" }));
            }
          }
          break;

        case "POST":
          // POST /users - Create new user
          if (!id) {
            try {
              const newUser = await getRequestBody(req);
              // Validate required fields
              if (!newUser.name || !newUser.email) {
                res.writeHead(400);
                res.end(
                  JSON.stringify({ error: "Name and email are required" })
                );
                return;
              }
              newUser.id = users.length + 1;
              users.push(newUser);
              res.writeHead(201);
              res.end(JSON.stringify(newUser));
            } catch (error) {
              res.writeHead(400);
              res.end(
                JSON.stringify({
                  error: `Invalid request: ${error.message}`,
                })
              );
              return;
            }
          } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "Invalid endpoint" }));
          }
          break;

        case "PUT":
          // PUT /users/:id - Update user
          if (id) {
            try {
              const userData = await getRequestBody(req);
              const index = users.findIndex((u) => u.id === parseInt(id));
              if (index !== -1) {
                // Preserve the ID while updating other fields
                users[index] = { ...userData, id: users[index].id };
                res.writeHead(200);
                res.end(JSON.stringify(users[index]));
              } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "User not found" }));
              }
            } catch (error) {
              res.writeHead(400);
              res.end(
                JSON.stringify({
                  error: `Invalid request: ${error.message}`,
                })
              );
              return;
            }
          } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "User ID required" }));
          }
          break;

        case "PATCH":
          // PATCH /users/:id - Partial update
          if (id) {
            try {
              const updates = await getRequestBody(req);
              const index = users.findIndex((u) => u.id === parseInt(id));
              if (index !== -1) {
                users[index] = { ...users[index], ...updates };
                res.writeHead(200);
                res.end(JSON.stringify(users[index]));
              } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: "User not found" }));
              }
            } catch (error) {
              res.writeHead(400);
              res.end(
                JSON.stringify({
                  error: `Invalid request: ${error.message}`,
                })
              );
              return;
            }
          } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "User ID required" }));
          }
          break;

        case "DELETE":
          // DELETE /users/:id - Delete user
          if (id) {
            const index = users.findIndex((u) => u.id === parseInt(id));
            if (index !== -1) {
              users = users.filter((u) => u.id !== parseInt(id));
              res.writeHead(200);
              res.end(JSON.stringify({ message: "User deleted successfully" }));
            } else {
              res.writeHead(404);
              res.end(JSON.stringify({ error: "User not found" }));
            }
          } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: "User ID required" }));
          }
          break;

        default:
          res.writeHead(405);
          res.end(JSON.stringify({ error: "Method not allowed" }));
      }
    }
    // Handle static files (like index.html)
    else if (req.url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(`
        <html>
          <head><title>API Documentation</title></head>
          <body>
            <h1>API Endpoints</h1>
            <pre>
GET    /users     - Get all users
GET    /users/:id - Get user by ID
POST   /users     - Create new user
PUT    /users/:id - Update user
PATCH  /users/:id - Partial update
DELETE /users/:id - Delete user
            </pre>
          </body>
        </html>
      `);
    }
    // Handle 404 for unknown routes
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not found" }));
    }
  } catch (error) {
    // Handle any server errors
    console.error("Server error:", error);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      })
    );
  }
});

// Start HTTP server
server.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
  console.log("\nAvailable endpoints:");
  console.log("GET    /users     - Get all users");
  console.log("GET    /users/:id - Get user by ID");
  console.log("POST   /users     - Create new user");
  console.log("PUT    /users/:id - Update user");
  console.log("PATCH  /users/:id - Partial update");
  console.log("DELETE /users/:id - Delete user");
});

/*
Test with curl commands:

1. GET all users:
   curl http://localhost:3000/users

2. GET single user:
   curl http://localhost:3000/users/1

3. CREATE user:
   curl -X POST http://localhost:3000/users \
   -H "Content-Type: application/json" \
   -d '{"name": "Alice", "email": "alice@example.com"}'

4. UPDATE user:
   curl -X PUT http://localhost:3000/users/1 \
   -H "Content-Type: application/json" \
   -d '{"name": "John Updated", "email": "john.updated@example.com"}'

5. PATCH user:
   curl -X PATCH http://localhost:3000/users/1 \
   -H "Content-Type: application/json" \
   -d '{"name": "John Patched"}'

6. DELETE user:
   curl -X DELETE http://localhost:3000/users/1
*/
