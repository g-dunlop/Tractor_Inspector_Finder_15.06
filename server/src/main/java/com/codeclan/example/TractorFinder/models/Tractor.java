package com.codeclan.example.TractorFinder.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tractors")
public class Tractor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="manufacturer")
    private String manufacturer;

    @JsonIgnoreProperties({"tractors"})
    @ManyToMany
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinTable(
            name = "inspectors_tractors",
            joinColumns = {@JoinColumn(name="tractor_id", nullable=false, updatable=false)},
            inverseJoinColumns = {@JoinColumn(name = "inspector_id", nullable=false, updatable=false)}
    )
    private List<Inspector> inspectors;

    public Tractor(String manufacturer) {
        this.manufacturer = manufacturer;
        this.inspectors = new ArrayList<>();
    }

    public Tractor(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public List<Inspector> getInspectors() {
        return inspectors;
    }

    public void setInspectors(List<Inspector> inspectors) {
        this.inspectors = inspectors;
    }
}


