import { useMemo, useState } from "react";
import "./App.css";

const initialSkills = [
  { id: 1, name: "Java", category: "Backend", level: 55, required: true },
  { id: 2, name: "React", category: "Frontend", level: 60, required: true },
  { id: 3, name: "SQL", category: "Database", level: 35, required: true },
  { id: 4, name: "Spring Boot", category: "Backend", level: 40, required: true },
  { id: 5, name: "Git & GitHub", category: "Tools", level: 70, required: true },
  { id: 6, name: "Docker", category: "DevOps", level: 15, required: false }
];

const initialProjects = [
  {
    id: 1,
    title: "CareerTrack",
    type: "Full-Stack",
    status: "Completed",
    technologies: "React, Java Spring Boot, H2, GitHub Actions"
  }
];

const requiredRoleSkills = [
  "Java",
  "React",
  "SQL",
  "Spring Boot",
  "Git & GitHub",
  "REST APIs",
  "Problem Solving"
];

function App() {
  const [targetRole, setTargetRole] = useState("Software Engineering Intern");
  const [skills, setSkills] = useState(initialSkills);
  const [projects, setProjects] = useState(initialProjects);

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

  const readinessScore = useMemo(() => {
    const requiredSkills = skills.filter((skill) => skill.required);
    if (requiredSkills.length === 0) return 0;

    const total = requiredSkills.reduce((sum, skill) => sum + Number(skill.level), 0);
    return Math.round(total / requiredSkills.length);
  }, [skills]);

  const missingSkills = requiredRoleSkills.filter(
    (requiredSkill) =>
      !skills.some(
        (skill) => skill.name.toLowerCase() === requiredSkill.toLowerCase()
      )
  );

  const weakSkills = skills.filter((skill) => skill.required && skill.level < 50);

  function handleSkillChange(event) {
    const { name, value, type, checked } = event.target;

    setSkillForm({
      ...skillForm,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function addSkill(event) {
    event.preventDefault();

    if (!skillForm.name.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    const newSkill = {
      id: Date.now(),
      ...skillForm,
      level: Number(skillForm.level)
    };

    setSkills([newSkill, ...skills]);

    setSkillForm({
      name: "",
      category: "Frontend",
      level: 50,
      required: true
    });
  }

  function deleteSkill(id) {
    setSkills(skills.filter((skill) => skill.id !== id));
  }

  function updateSkillLevel(id, newLevel) {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, level: Number(newLevel) } : skill
      )
    );
  }

  function handleProjectChange(event) {
    setProjectForm({
      ...projectForm,
      [event.target.name]: event.target.value
    });
  }

  function addProject(event) {
    event.preventDefault();

    if (!projectForm.title.trim()) {
      alert("Please enter a project title.");
      return;
    }

    const newProject = {
      id: Date.now(),
      ...projectForm
    };

    setProjects([newProject, ...projects]);

    setProjectForm({
      title: "",
      type: "Full-Stack",
      status: "In Progress",
      technologies: ""
    });
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
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
          {missingSkills.length === 0 && weakSkills.length === 0 ? (
            <p className="positive">Strong match for the selected role.</p>
          ) : (
            <ul>
              {missingSkills.map((skill) => (
                <li key={skill}>Add or improve: {skill}</li>
              ))}
              {weakSkills.map((skill) => (
                <li key={skill.name}>
                  Improve {skill.name}: current level is {skill.level}%
                </li>
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
                      updateSkillLevel(skill.id, event.target.value)
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