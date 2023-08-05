module.exports = {
    apps: [
        {
            name: 'e-library-app',
            script: 'npm',
            args: 'run start:dev',
            watch: true,
            ignore_watch: ['node_modules', 'logs', 'tmp'],
            watch_options: {
                followSymlinks: false,
            },
            env: {
                NODE_ENV: 'development',
            },
        },
    ],
};
