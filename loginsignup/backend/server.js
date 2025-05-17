const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:4000',
    'http://localhost:3000',
    'http://localhost:5000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'], // Added HEAD
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "signup_login"
})

app.get('/', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login/Signup API Documentation</title>
            <style>
                :root {
                    --primary: #3498db;
                    --secondary: #2980b9;
                    --success: #2ecc71;
                    --light: #f8f9fa;
                    --dark: #343a40;
                    --border-radius: 8px;
                    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    background-color: var(--light);
                    color: var(--dark);
                    padding: 0;
                    margin: 0;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                header {
                    background-color: var(--primary);
                    color: white;
                    padding: 30px 0;
                    text-align: center;
                    margin-bottom: 30px;
                    box-shadow: var(--box-shadow);
                }
                
                h1 {
                    margin: 0;
                    font-size: 2.5rem;
                }
                
                h2 {
                    color: var(--primary);
                    border-bottom: 2px solid var(--primary);
                    padding-bottom: 10px;
                    margin-top: 40px;
                }
                
                .card {
                    background-color: white;
                    border-radius: var(--border-radius);
                    padding: 25px;
                    margin-bottom: 25px;
                    box-shadow: var(--box-shadow);
                }
                
                .endpoint {
                    margin-bottom: 15px;
                    padding: 15px;
                    border-left: 4px solid var(--primary);
                    background-color: rgba(52, 152, 219, 0.1);
                }
                
                .method {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-weight: bold;
                    margin-right: 10px;
                }
                
                .get {
                    background-color: #61affe;
                    color: white;
                }
                
                .post {
                    background-color: #49cc90;
                    color: white;
                }
                
                pre {
                    background-color: #272822;
                    color: #f8f8f2;
                    padding: 15px;
                    border-radius: var(--border-radius);
                    overflow-x: auto;
                    margin: 20px 0;
                }
                
                code {
                    font-family: 'Consolas', 'Monaco', monospace;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                
                table th, table td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                
                table th {
                    background-color: var(--primary);
                    color: white;
                }
                
                .footer {
                    text-align: center;
                    margin-top: 50px;
                    padding: 20px;
                    color: #666;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>Login/Signup API Documentation</h1>
                <p>RESTful API for user authentication and registration</p>
            </header>
            
            <div class="container">
                <div class="card">
                    <h2>Overview</h2>
                    <p>This API provides endpoints for user registration and authentication. It's built with Node.js, Express, and MySQL.</p>
                    
                    <h2>Base URL</h2>
                    <p>All endpoints are relative to: <code>http://localhost:3001</code></p>
                    
                    <h2>Authentication</h2>
                    <p>Currently, this API does not require authentication tokens for access.</p>
                </div>
                
                <div class="card">
                    <h2>Endpoints</h2>
                    
                    <div class="endpoint">
                        <span class="method get">GET</span>
                        <strong>/</strong>
                        <p>Returns this API documentation page.</p>
                        <p><strong>Response:</strong> HTML documentation.</p>
                    </div>
                    
                    <div class="endpoint">
                        <span class="method post">POST</span>
                        <strong>/signup</strong>
                        <p>Creates a new user account.</p>
                        
                        <h3>Request Body</h3>
                        <pre><code>{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}</code></pre>
                        
                        <h3>Response</h3>
                        <p>Successful Response (200 OK):</p>
                        <pre><code>{
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 1,
  "serverStatus": 2,
  "warningCount": 0,
  "message": "",
  "protocol41": true,
  "changedRows": 0
}</code></pre>

                        <p>Error Response:</p>
                        <pre><code>"Error"</code></pre>
                    </div>
                </div>
                
                <div class="card">
                    <h2>Database Connection</h2>
                    <p>The API connects to a MySQL database with the following configuration:</p>
                    
                    <table>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Host</td>
                            <td>localhost</td>
                        </tr>
                        <tr>
                            <td>Database Name</td>
                            <td>signup_login</td>
                        </tr>
                        <tr>
                            <td>User</td>
                            <td>root</td>
                        </tr>
                        <tr>
                            <td>Schema</td>
                            <td>Table: login (name, email, password)</td>
                        </tr>
                    </table>
                </div>
                
                <div class="card">
                    <h2>Error Handling</h2>
                    <p>The API returns "Error" as a string when an operation fails.</p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2023 Login/Signup API. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    )
})
app.use(express.json());

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.password
    ]
        db.query(sql,[values], (err, data) => {
            if(err)
            {
                return res.json("Error");
            }
            return res.json(data);
        })
    })


    app.listen(3001, () => {
        console.log('connected');
    })
