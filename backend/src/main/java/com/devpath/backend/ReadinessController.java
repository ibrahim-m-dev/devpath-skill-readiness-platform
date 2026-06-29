package com.devpath.backend;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReadinessController {

    private final SkillRepository skillRepository;
    private final PortfolioProjectRepository projectRepository;

    private final List<String> requiredRoleSkills = List.of(
            "Java",
            "React",
            "SQL",
            "Spring Boot",
            "Git & GitHub",
            "REST APIs",
            "Problem Solving"
    );

    public ReadinessController(
            SkillRepository skillRepository,
            PortfolioProjectRepository projectRepository
    ) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping("/api/readiness")
    public Map<String, Object> getReadinessSummary() {
        List<Skill> skills = skillRepository.findAll();

        List<Skill> requiredSkills = skills.stream()
                .filter(Skill::isRequired)
                .toList();

        int readinessScore = 0;

        if (!requiredSkills.isEmpty()) {
            int total = requiredSkills.stream()
                    .mapToInt(Skill::getLevel)
                    .sum();

            readinessScore = Math.round((float) total / requiredSkills.size());
        }

        List<String> missingSkills = new ArrayList<>();

        for (String requiredSkill : requiredRoleSkills) {
            boolean exists = skills.stream()
                    .anyMatch(skill -> skill.getName().equalsIgnoreCase(requiredSkill));

            if (!exists) {
                missingSkills.add(requiredSkill);
            }
        }

        List<String> weakSkills = requiredSkills.stream()
                .filter(skill -> skill.getLevel() < 50)
                .map(skill -> skill.getName() + " is only " + skill.getLevel() + "%")
                .toList();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("targetRole", "Software Engineering Intern");
        response.put("readinessScore", readinessScore);
        response.put("totalSkills", skills.size());
        response.put("totalProjects", projectRepository.count());
        response.put("requiredRoleSkills", requiredRoleSkills);
        response.put("missingSkills", missingSkills);
        response.put("weakSkills", weakSkills);

        return response;
    }
}