-- Create database (run in pgAdmin or psql)
CREATE DATABASE BlogDB;

\c BlogDB

-- Create users table
CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- Create blogs table
CREATE TABLE blogs (
  blog_id SERIAL PRIMARY KEY,
  creator_name VARCHAR(255) NOT NULL,
  creator_user_id VARCHAR(255) REFERENCES users(user_id),
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users
INSERT INTO users (user_id, password, name) VALUES
('alice', 'password123', 'Alice Smith'),
('bob', 'securepass', 'Bob Johnson'),
('charlie', 'charliepwd', 'Charlie Davis');

-- Insert sample blog posts
INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES
('Alice Smith', 'alice', 'Welcome to my blog', 'This is my first blog post!', '2025-01-01 10:00:00'),
('Bob Johnson', 'bob', 'Node.js Tips', 'Here are some useful Node.js tips...', '2025-01-02 15:30:00'),
('Charlie Davis', 'charlie', 'Express.js Guide', 'Express.js makes backend easy.', '2025-01-03 08:20:00'),
('Alice Smit
