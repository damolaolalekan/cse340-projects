import pool from "./db.js";

export async function getAllProjects() {
    const sql = `
        SELECT
            p.project_id,
            p.name,
            p.description,
            o.name AS organization
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

    const result = await pool.query(sql);
    return result.rows;
}