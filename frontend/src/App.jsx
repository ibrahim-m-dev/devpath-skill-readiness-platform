import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api";

function App() {
  const [targetRole, setTargetRole] = useState("Software Engineering Intern");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [readiness, setReadiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Frontend",
    level: 50,
    required: true
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    type: "Full-Stack",
    status: "In Progress",
    technologies: ""
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [skillsResponse, projectsResponse, readinessResponse] =
        await Promise.all([
          fetch(`${API_URL}/skills`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/readiness`)
        ]);

      const skillsData = await skillsResponse.json();
      const projectsData = await projectsResponse.json();
      const readinessData = await readinessResponse.json();

      setSkills(skillsData);
      setProjects(projectsData);
      setReadiness(readinessData);
      setTargetRole(readinessData.targetRole || "Software Engineering Intern");
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      alert("Backend connection failed. Make sure Spring Boot is running on port 8080.");
    } finally {
      setLoading(false);
    }
  }

  const readinessScore = readiness?.readinessScore ?? 0;

  const requiredRoleSkills = useMemo(() => {
    return readiness?.requiredRoleSkills || [
      "Java",
      "React",
      "SQL",
      "Spring Boot",
      "Git & GitHub",
      "REST APIs",
      "Problem Solving"
    ];
  }, [readiness]);

  function handleSkillChange(event) {
    const { name, value, type, checked } = event.target;

    setSkillForm({
      ...skillForm,
      [name]: type === "checkbox" ? checked : value
    });
  }

  async function addSkill(event) {
    event.preventDefault();

    if (!skillForm.name.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    const newSkill = {
      ...skillForm,
      level: Number(skillForm.level)
    };

    await fetch(`${API_URL}/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSkill)
    });

    setSkillForm({
      name: "",
      category: "Frontend",
      level: 50,
      required: true
    });

    loadDashboard();
  }

  async function deleteSkill(id) {
    await fetch(`${API_URL}/skills/${id}`, {
      method: "DELETE"
    });

    loadDashboard();
  }

  async function updateSkillLevel(skill, newLevel) {
    const updatedSkill = {
      ...skill,
      level: Number(newLevel)
    };

    await fetch(`${API_URL}/skills/${skill.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedSkill)
    });

    loadDashboard();
  }

  function handleProjectChange(event) {
    setProjectForm({
      ...projectForm,
      [event.target.name]: event.target.value
    });
  }

  async function addProject(event) {
    event.preventDefault();

    if (!projectForm.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectForm)
    });

    setProjectForm({
      title: "",
      type: "Full-Stack",
      status: "In Progress",
      technologies: ""
    });

    loadDashboard();
  }

  async function deleteProject(id) {
    await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE"
    });

    loadDashboard();
  }

  if (loading) {
    return (
      <main className="app">
        <section className="hero">
          <p className="label">DevPath</p>
          <h1>Loading dashboard...</h1>
          <p>Connecting to the Spring Boot backend API.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="label">DevPath</p>
        <h1>Skill & Job Readiness Platform</h1>
        <p>
          A full-stack readiness dashboard that helps students track technical
          skills, portfolio projects, and target job requirements.
        </p>
      </section>

      <section className="overview">
        <div className="role-card">
          <span>Target Role</span>
          <input
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
          />
        </div>

        <div className="score-card">
          <span>Readiness Score</span>
          <strong>{readinessScore}%</strong>
          <div className="progress">
            <div style={{ width: `${readinessScore}%` }}></div>
          </div>
        </div>

        <div className="role-card">
          <span>Total Skills</span>
          <strong>{skills.length}</strong>
        </div>

        <div className="role-card">
          <span>Portfolio Projects</span>
          <strong>{projects.length}</strong>
        </div>
      </section>

      <section className="insights">
        <div>
          <h2>Role Skill Requirements</h2>
          <div className="tags">
            {requiredRoleSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div>
          <h2>Improvement Suggestions</h2>

          {readiness?.missingSkills?.length === 0 &&
          readiness?.weakSkills?.length === 0 ? (
            <p className="positive">Strong match for the selected role.</p>
          ) : (
            <ul>
              {readiness?.missingSkills?.map((skill) => (
                <li key={skill}>Add or improve: {skill}</li>
              ))}

              {readiness?.weakSkills?.map((skill) => (
                <li key={skill}>Improve: {skill}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="content">
        <form className="panel" onSubmit={addSkill}>
          <h2>Add Skill</h2>

          <input
            name="name"
            placeholder="Skill name"
            value={skillForm.name}
            onChange={handleSkillChange}
          />

          <select
            name="category"
            value={skillForm.category}
            onChange={handleSkillChange}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Database</option>
            <option>DevOps</option>
            <option>Tools</option>
            <option>Soft Skill</option>
          </select>

          <label className="range-label">
            Skill level: {skillForm.level}%
            <input
              name="level"
              type="range"
              min="0"
              max="100"
              value={skillForm.level}
              onChange={handleSkillChange}
            />
          </label>

          <label className="checkbox">
            <input
              name="required"
              type="checkbox"
              checked={skillForm.required}
              onChange={handleSkillChange}
            />
            Required for target role
          </label>

          <button type="submit">Add Skill</button>
        </form>

        <section className="panel">
          <h2>Skill Progress</h2>

          <div className="skill-list">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.id}>
                <div>
                  <h3>{skill.name}</h3>
                  <small>
                    {skill.category} {skill.required ? "• Required" : ""}
                  </small>
                </div>

                <div className="skill-control">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(event) =>
                      updateSkillLevel(skill, event.target.value)
                    }
                  />
                  <strong>{skill.level}%</strong>
                </div>

                <button className="delete" onClick={() => deleteSkill(skill.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="content">
        <form className="panel" onSubmit={addProject}>
          <h2>Add Portfolio Project</h2>

          <input
            name="title"
            placeholder="Project title"
            value={projectForm.title}
            onChange={handleProjectChange}
          />

          <select
            name="type"
            value={projectForm.type}
            onChange={handleProjectChange}
          >
            <option>Full-Stack</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Data</option>
            <option>Automation</option>
          </select>

          <select
            name="status"
            value={projectForm.status}
            onChange={handleProjectChange}
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Planned</option>
          </select>

          <textarea
            name="technologies"
            placeholder="Technologies used"
            value={projectForm.technologies}
            onChange={handleProjectChange}
          />

          <button type="submit">Add Project</button>
        </form>

        <section className="panel">
          <h2>Portfolio Projects</h2>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.technologies}</p>
                </div>

                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.status}</span>
                </div>

                <button
                  className="delete"
                  onClick={() => deleteProject(project.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;