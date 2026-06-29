package com.devpath.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @Min(0)
    @Max(100)
    private int level;

    private boolean required;

    public Skill() {
    }

    public Skill(String name, String category, int level, boolean required) {
        this.name = name;
        this.category = category;
        this.level = level;
        this.required = required;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public int getLevel() {
        return level;
    }

    public boolean isRequired() {
        return required;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public void setRequired(boolean required) {
        this.required = required;
    }
}