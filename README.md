DevPath – Skill & Job Readiness Platform

"Frontend Build Check" (https://github.com/ibrahim-m-dev/devpath-skill-readiness-platform/actions/workflows/frontend.yml/badge.svg)
"Backend Build Check" (https://github.com/ibrahim-m-dev/devpath-skill-readiness-platform/actions/workflows/backend.yml/badge.svg)

DevPath is a full-stack skill and job readiness platform built to help students track technical skills, portfolio projects, and career preparation progress for internship and entry-level software roles.

The platform calculates a readiness score based on required skills for a selected target role and highlights missing or weak skills that need improvement.

Features

- Track technical skills with progress levels
- Mark skills as required for a target role
- Add and manage portfolio projects
- View total skills and total projects
- Calculate readiness score automatically
- Identify missing role-related skills
- Highlight weak skills below the recommended level
- Connect React frontend to Java Spring Boot backend through REST APIs
- Store data using an H2 development database
- Validate frontend and backend builds using GitHub Actions

Tech Stack

Frontend

- React
- Vite
- JavaScript
- CSS

Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- REST API

Tools

- Git
- GitHub
- GitHub Actions
- VS Code

API Endpoints

Method| Endpoint| Description
GET| "/api/skills"| Get all skills
POST| "/api/skills"| Add a new skill
PUT| "/api/skills/{id}"| Update a skill
DELETE| "/api/skills/{id}"| Delete a skill
GET| "/api/projects"| Get all portfolio projects
POST| "/api/projects"| Add a new portfolio project
PUT| "/api/projects/{id}"| Update a portfolio project
DELETE| "/api/projects/{id}"| Delete a portfolio project
GET| "/api/readiness"| Get readiness score and improvement suggestions

How to Run Locally

Backend

cd backend
mvnw.cmd spring-boot:run

Backend runs on:

http://localhost:8080

Frontend

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

Current Status

The project currently includes a React frontend, Java Spring Boot backend, REST API integration, H2 database, readiness score calculation, and GitHub Actions build checks.

Future Improvements

- Add user authentication with JWT
- Replace H2 with PostgreSQL
- Add Docker support
- Add role templates for different internship types
- Add unit and integration tests
- Add charts for skill progress analytics
- Deploy frontend and backend online

Purpose

This project was created as a serious full-stack portfolio project to demonstrate practical software development skills, including frontend development, backend API design, database integration, and CI/CD workflow setup.