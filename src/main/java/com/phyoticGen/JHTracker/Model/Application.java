package com.phyoticGen.JHTracker.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String link;
    private String status;

    @Temporal(TemporalType.DATE)
    private LocalDate applyDate;
    @Temporal(TemporalType.TIME)
    private LocalTime applyTime;
    
    private int commute;
    private String city;
    private String state;
    private String company;
    private double salary;
    private String notes;
    private String tech;

    public Application() {

    }
    
    public Application(String title, String link, String status, LocalDate applyDate, LocalTime applyTime, int commute, String city, String state, String company, double salary, String notes, String tech) {
        this.title = title;
        this.link = link;
        this.status = status;
        this.applyDate = applyDate;
        this.applyTime = applyTime;
        this.commute = commute;
        this.city = city;
        this.state = state;
        this.company = company;
        this.salary = salary;
        this.notes = notes;
        this.tech = tech;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(LocalDate applyDate) {
        this.applyDate = applyDate;
    }

    public LocalTime getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(LocalTime applyTime) {
        this.applyTime = applyTime;
    }

    public int getCommute() {
        return commute;
    }

    public void setCommute(int commute) {
        this.commute = commute;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getTech() {
        return tech;
    }

    public void setTech(String tech) {
        this.tech = tech;
    }

    @Override
    public String toString() {
        return "Application [id=" + id + ", title=" + title + ", link=" + link + ", status=" + status + ", applyDate="
                + applyDate + ", applyTime=" + applyTime + ", commute=" + commute + ", city=" + city + ", state="
                + state + ", company=" + company + ", salary=" + salary + ", notes=" + notes + ", tech="
                + tech + "]";
    } 
}
