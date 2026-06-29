package com.devpath.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SkillRepository skillRepository;
    private final PortfolioProjectRepository projectRepository;

    public DataSeeder(
            SkillRepository skillRepository,
            PortfolioProjectRepository projectRepository
    ) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) {
        if (skillRepository.count() == 0) {
            skillRepository.save(new Skill("Java", "Backend", 55, true));
            skillRepository.save(new Skill("React", "Frontend", 60, true));
            skillRepository.save(new Skill("SQL", "Database", 35, true));
            skillRepository.save(new Skill("Spring Boot", "Backend", 40, true));
            skillRepository.save(new Skill("Git & GitHub", "Tools", 70, true));
            skillRepository.save(new Skill("Docker", "DevOps", 15, false));
        }

        if (projectRepository.count() == 0) {
            projectRepository.save(new PortfolioProject(
                    "CareerTrack",
                    "Full-Stack",
                    "Completed",
                    "React, Java Spring Boot, H2, GitHub Actions"
            ));
        }
    }
}