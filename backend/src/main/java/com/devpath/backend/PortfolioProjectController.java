package com.devpath.backend;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioProjectController {

    private final PortfolioProjectRepository projectRepository;

    public PortfolioProjectController(PortfolioProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<PortfolioProject> getAllProjects() {
        return projectRepository.findAll();
    }

    @PostMapping
    public PortfolioProject createProject(@Valid @RequestBody PortfolioProject project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public PortfolioProject updateProject(
            @PathVariable Long id,
            @Valid @RequestBody PortfolioProject updatedProject
    ) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setTitle(updatedProject.getTitle());
                    project.setType(updatedProject.getType());
                    project.setStatus(updatedProject.getStatus());
                    project.setTechnologies(updatedProject.getTechnologies());
                    return projectRepository.save(project);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }
}