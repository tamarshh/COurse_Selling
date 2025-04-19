import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create write streams for different types of logs
const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
);

const errorLogStream = fs.createWriteStream(
    path.join(logsDir, 'error.log'),
    { flags: 'a' }
);

// ✅ Custom token for request body logging
morgan.token('body', (req) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.stringify(req.body);
    }
    return '';
});

// ✅ Custom token for error message logging
morgan.token('error', (req, res) => res.locals.errorMessage || '-');

// Access log format
const accessFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body';

// Error log format
const errorFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body - :error';

// Access logger middleware
export const accessLogger = morgan(accessFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode >= 400
});

// Error logger middleware
export const errorLogger = morgan(errorFormat, {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400
});

// Console logger middleware
export const consoleLogger = morgan('dev');
