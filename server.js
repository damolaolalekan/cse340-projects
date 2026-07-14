import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;


// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));


/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
app.get('/', (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', (req, res) => {
    const organizations = await getAllOrganizations();
    console.log('Organizations:', organizations); // Log the retrieved organizations for debugging

    const title = 'Organizations';
    res.render('organizations', { title, organizations });
    
});

app.get('/projects', (req, res) => {
    const title = 'Projects';
    res.render('projects', { title });
});

app.get("/categories", (req, res) => {
    const title = 'Categories';
    res.render('categories', { title });
});

app.listen(PORT, async () => {

    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    }
    catch (error) {
        console.error('Failed to start server due to database connection error:', error.message);
        process.exit(1); // Exit the process with an error code
    }
});
