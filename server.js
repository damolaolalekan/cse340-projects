import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllCategories } from './src/models/categories.js';
import { getAllProjects } from "./src/models/projects.js";

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

app.get('/organizations', async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        console.log(organizations);

        res.render('organizations', {
            title: 'Organizations',
            organizations
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving organizations');
    }
});


app.listen(PORT, async () => {

    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    }
    catch (error) {
    console.error('Failed to start server due to database connection error:');
    console.error(error);
    process.exit(1); // Exit the process with an error code
    }
});


app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Categories',
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving categories');
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects();

        console.log(projects); // Verify the query works

        res.render('projects', {
            title: 'Projects',
            projects
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving projects');
    }
});
