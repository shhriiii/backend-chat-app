# Simple Socket Chat Server (Node.js)

A lightweight **TCP-based chat server** built using **Node.js** and the built-in `net` module no HTTP, no frameworks, no databases.

This server allows multiple users to connect via terminal (`nc`), log in with usernames, and chat in real-time.

---
**YouTube :** [LINK](https://youtu.be/abuLmKTkDBw?si=D4s_ndSd8sjyUQi0)


## Features

Multi-user real-time chat  
Login system (`LOGIN <username>`)  
Broadcast messages (`MSG <text>`)  
User list (`WHO`)  
Private messages (`DM <username> <text>`)  
Logout (`LOGOUT`)  
Automatic disconnect notice  
Configurable port via environment variable or CLI argument  
Uses only Node’s built-in **net** module

---

## Requirements

- **Node.js** (v16+ recommended)
- **Terminal with netcat (`nc`)** or **telnet**

---

## Setup Instructions

1. **Clone or create project folder**
   ```bash
   mkdir simple-socket-chat
   cd simple-socket-chat
   ```
2. Initialize project
   ```bash
   npm init -y
   ```
3. server.js
4. Run the server
   ```bash
   node server.js
   ```
