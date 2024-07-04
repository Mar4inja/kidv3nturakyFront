const path = require('path');

module.exports = {
    entry: './src/index.js', // Jūsu galvenais ieejas punkts
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Katalogs, kurā tiek izvietoti veidotie faili
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // Vai .jsx, atkarībā no jūsu projekta
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Babel preset konfigurācija
                    },
                },
            },
            {
                test: /\.css$/, // Piemērs CSS failiem
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                type: 'javascript/auto',  // Ja izmantojat Webpack 5, pievienojiet šo tipu
            },
            // Pievienojiet šeit citas nepieciešamās loaderu konfigurācijas
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],  // Paplašinājumi, kurus Webpack atpazīst
    },
    devtool: 'source-map',  // Pārbaudiet avota kartes (source maps) izmantošanu
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,  // Pārliecinieties, ka tas ir pieejams
    },
};
