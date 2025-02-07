const app = require("./src/app");
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`🚀 Server running on port ${PORT}`));

// Handle server close gracefully
process.on('SIGINT', () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
  let server;