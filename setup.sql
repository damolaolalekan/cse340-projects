-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert Sample Data: Organizations
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Category Table
-- ========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- ========================================
-- Insert Sample Data: Categories
-- ========================================

INSERT INTO category (name, description)
VALUES
(
    'Environmental',
    'Projects focused on environmental sustainability and conservation.'
),
(
    'Educational',
    'Projects that support education and learning.'
),
(
    'Community Service',
    'Projects that improve local communities.'
),
(
    'Health and Wellness',
    'Projects promoting health and well-being.'
);

-- ========================================
-- Project Table
-- ========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Data: Projects
-- ========================================

INSERT INTO project (
    name,
    description,
    location,
    project_date,
    organization_id
)
VALUES
(
    'Community Park Renovation',
    'Help renovate and beautify the neighborhood park.',
    'St. Catharines',
    '2026-08-15',
    1
),
(
    'Urban Garden Workshop',
    'Teach residents how to grow sustainable food.',
    'Niagara Falls',
    '2026-09-05',
    2
),
(
    'Food Bank Volunteer Day',
    'Assist local food banks with sorting and distributing food.',
    'Welland',
    '2026-10-10',
    3
);

-- ========================================
-- Project Category Table
-- ========================================

CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_pc_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pc_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Data: Project Categories
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 2),
(3, 3),
(3, 4);

-- ========================================
-- Verify the Data
-- ========================================

SELECT * FROM organization;
SELECT * FROM category;
SELECT * FROM project;
SELECT * FROM project_category;
