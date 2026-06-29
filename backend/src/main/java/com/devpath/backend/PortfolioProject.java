package com.devpath.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "portfolio_projects")
public class PortfolioProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String type;

    @NotBlank
    private String status;

    private String technologies;

    public PortfolioProject() {
    }

    public PortfolioProject(String title, String type, String status, String technologies) {
        this.title = title;
        this.type = type;
        this.status = status;
        this.technologies = technologies;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public String getStatus() {
        return status;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }
}