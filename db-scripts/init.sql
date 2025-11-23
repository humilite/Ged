-- PostgreSQL database initialization script for GED project

-- Create database if not exists (run outside this script as superuser)
-- CREATE DATABASE ged_db;

-- Connect to the database ged_db before running these commands

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: documents
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    filepath TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: plan_classement (hierarchical classification plan)
CREATE TABLE IF NOT EXISTS plan_classement (
    id SERIAL PRIMARY KEY,
    parent_id INT REFERENCES plan_classement(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Additional tables like metadonnees, droits_acces, historique_actions, workflow_validation, notifications to be added in later phases
