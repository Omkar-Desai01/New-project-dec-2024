import os from "os";

// System Information
console.log("\n=== System Information ===");
console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`OS Type: ${os.type()}`);
console.log(`OS Version: ${os.version()}`);

// Memory Usage
console.log("\n=== Memory Information ===");
const totalMemGB = os.totalmem() / (1024 * 1024 * 1024);
const freeMemGB = os.freemem() / (1024 * 1024 * 1024);
console.log(`Total Memory: ${totalMemGB.toFixed(2)} GB`);
console.log(`Free Memory: ${freeMemGB.toFixed(2)} GB`);
console.log(`Used Memory: ${(totalMemGB - freeMemGB).toFixed(2)} GB`);

// CPU Information
console.log("\n=== CPU Information ===");
const cpus = os.cpus();
console.log(`Number of CPU Cores: ${cpus.length}`);
console.log(`CPU Model: ${cpus[0].model}`);
console.log(`CPU Speed: ${cpus[0].speed} MHz`);

// Network Information
console.log("\n=== Network Information ===");
const nets = os.networkInterfaces();
Object.keys(nets).forEach((name) => {
  console.log(`\nInterface: ${name}`);
  nets[name].forEach((net) => {
    if (net.family === "IPv4") {
      console.log(`  IPv4 Address: ${net.address}`);
      console.log(`  Netmask: ${net.netmask}`);
      console.log(`  MAC Address: ${net.mac}`);
    }
  });
});

// User Information
console.log("\n=== User Information ===");
console.log(`Home Directory: ${os.homedir()}`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Temp Directory: ${os.tmpdir()}`);

/* Example Output:
=== System Information ===
Platform: win32
Architecture: x64
OS Type: Windows_NT
OS Version: Windows 10 Pro 10.0.19045

=== Memory Information ===
Total Memory: 16.00 GB
Free Memory: 8.50 GB
Used Memory: 7.50 GB

=== CPU Information ===
Number of CPU Cores: 6
CPU Model: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
CPU Speed: 2592 MHz

=== Network Information ===
Interface: Wi-Fi
  IPv4 Address: 192.168.1.100
  Netmask: 255.255.255.0
  MAC Address: 01:23:45:67:89:ab

Interface: Loopback Pseudo-Interface 1
  IPv4 Address: 127.0.0.1
  Netmask: 255.0.0.0
  MAC Address: 00:00:00:00:00:00

=== User Information ===
Home Directory: C:\Users\YourUsername
Hostname: DESKTOP-ABC123
Temp Directory: C:\Users\YourUsername\AppData\Local\Temp
*/
