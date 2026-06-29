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
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    @PostMapping
    public Skill createSkill(@Valid @RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @PutMapping("/{id}")
    public Skill updateSkill(@PathVariable Long id, @Valid @RequestBody Skill updatedSkill) {
        return skillRepository.findById(id)
                .map(skill -> {
                    skill.setName(updatedSkill.getName());
                    skill.setCategory(updatedSkill.getCategory());
                    skill.setLevel(updatedSkill.getLevel());
                    skill.setRequired(updatedSkill.isRequired());
                    return skillRepository.save(skill);
                })
                .orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
    }
}