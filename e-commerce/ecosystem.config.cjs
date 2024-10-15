module.exports = {
    apps: [
        {
            name: "e-commerce",
            script: "index.js",
            // instances: 2, // Use 2 instances for clustering
            // instances: 1,
            exec_mode: "cluster", // Enable cluster mode
            log_file: "./logs/out.log", // Logs file
            error_file: "./logs/error.log", // Log file for errors
            env: {
                NODE_ENV: "production", // Environment variable for production
                PORT: 3000,
            },
        },
    ],
};
