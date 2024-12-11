// ==================== PROCESS MODULE EXAMPLES ====================

// Basic Process Information
console.log("\n=== Basic Process Information ===");
console.log(`Process ID: ${process.pid}`);
console.log(`Node.js Version: ${process.version}`);
console.log(`Platform: ${process.platform}`);
console.log(`Architecture: ${process.arch}`);

// Environment Variables
console.log("\n=== Environment Variables ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PATH:", process.env.PATH);
console.log("USER:", process.env.USER || process.env.USERNAME);

// Memory Usage
console.log("\n=== Memory Usage ===");
const memory = process.memoryUsage();
Object.entries(memory).forEach(([key, value]) => {
  console.log(`${key}: ${(value / 1024 / 1024).toFixed(2)} MB`);
});

// Current Working Directory
console.log("\n=== Directory Information ===");
console.log("Current Directory:", process.cwd());
console.log("Script Path:", process.argv[1]);

// Command Line Arguments
console.log("\n=== Command Line Arguments ===");
process.argv.forEach((arg, index) => {
  console.log(`Argument ${index}: ${arg}`);
});

// CPU Usage
console.log("\n=== CPU Usage ===");
const startUsage = process.cpuUsage();
// Do some CPU intensive operation
for (let i = 0; i < 1000000; i++) {}
const endUsage = process.cpuUsage(startUsage);
console.log("CPU User Time:", endUsage.user);
console.log("CPU System Time:", endUsage.system);

// Process Events
// process.on("exit", (code) => {
//   console.log("\n=== Process Exit ===");
//   console.log(`Process exiting with code: ${code}`);
// });

// Error Handling
process.on("uncaughtException", (err) => {
  console.log("\n=== Uncaught Exception ===");
  console.error("Error:", err.message);
  // Gracefully shutdown
  //   process.exit(1);
});

// Resource Limits
console.log("\n=== Resource Limits ===");
const resourceLimits = process.getActiveResourceHandle();
console.log("Resource Limits:", resourceLimits);

/* Example Output:
=== Basic Process Information ===
Process ID: 12345
Node.js Version: v20.11.0
Platform: win32
Architecture: x64

=== Environment Variables ===
NODE_ENV: development
PATH: C:\Windows\system32;C:\Windows;...
USER: YourUsername

=== Memory Usage ===
heapTotal: 12.54 MB
heapUsed: 5.23 MB
external: 0.89 MB
arrayBuffers: 0.29 MB
rss: 35.67 MB

=== Directory Information ===
Current Directory: E:\Codes\Node\New project dec 2024
Script Path: E:\Codes\Node\New project dec 2024\process.js

=== Command Line Arguments ===
Argument 0: C:\Program Files\nodejs\node.exe
Argument 1: E:\Codes\Node\New project dec 2024\process.js

=== CPU Usage ===
CPU User Time: 1234
CPU System Time: 5678

=== Process Exit ===
Process exiting with code: 0
*/

// Utility Functions
const formatBytes = (bytes) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

// Process Resource Monitor
const monitorResources = () => {
  console.log("\n=== Resource Monitor ===");

  // Memory
  const mem = process.memoryUsage();
  console.log("Memory Usage:");
  console.log(`  Heap Total: ${formatBytes(mem.heapTotal)}`);
  console.log(`  Heap Used: ${formatBytes(mem.heapUsed)}`);
  console.log(`  RSS: ${formatBytes(mem.rss)}`);

  // CPU
  const cpu = process.cpuUsage();
  console.log("CPU Usage:");
  console.log(`  User CPU Time: ${cpu.user}µs`);
  console.log(`  System CPU Time: ${cpu.system}µs`);

  // Uptime
  console.log(`Uptime: ${process.uptime().toFixed(2)} seconds`);
};

// Monitor resources every 5 seconds
const monitoring = setInterval(monitorResources, 5000);

// Clean up on exit
process.on("SIGINT", () => {
  clearInterval(monitoring);
  console.log("\nMonitoring stopped");
  process.exit(0);
});

/*
Key Features Demonstrated:
1. Process Information
   - Process ID
   - Node.js Version
   - Platform
   - Architecture

2. Environment Variables
   - Access to system environment
   - Common variables

3. Memory Management
   - Heap usage
   - RSS (Resident Set Size)
   - Memory formatting

4. Directory Information
   - Current working directory
   - Script location

5. Command Line Arguments
   - Access to process arguments
   - Argument parsing

6. CPU Usage Monitoring
   - User time
   - System time

7. Event Handling
   - Exit events
   - Error handling
   - Signal handling (SIGINT)

8. Resource Monitoring
   - Periodic resource checks
   - Formatted output
   - Cleanup on exit

Usage:
1. Run normally:
   node process.js

2. Run with arguments:
   node process.js arg1 arg2

3. Stop monitoring:
   Press Ctrl+C
*/
