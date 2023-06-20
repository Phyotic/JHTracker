package com.phyoticGen.JHTracker.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String role;
    private String link;
    private String status;
    private String applyDate;
    private String applyTime;
    private int commute;
    private String city;
    private String state;
    private String company;
    private String salary;
    private String notes;
    private String tech;

    public Application() {
        
    }

    // public Application() {
    //     this.role = "";
    //     this.link = "";
    //     this.status = "";
    //     this.applyDate = "";
    //     this.applyTime = "";
    //     this.commute = 0;
    //     this.city = "";
    //     this.state = "";
    //     this.salary = "";
    //     this.notes = "";
    //     this.tech = "";
    // }
    
    public Application(String role, String link, String status, String applyDate, String applyTime, int commute, String city, String state, String company, String salary, String notes, String tech) {
        this.role = role;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public String getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(String applyDate) {
        this.applyDate = applyDate;
    }

    public String getApplyTime() {
        return applyTime;
    }

    public void setApplyTime(String applyTime) {
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

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
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
        return "Application [id=" + id + ", role=" + role + ", link=" + link + ", status=" + status + ", applyDate="
                + applyDate + ", applyTime=" + applyTime + ", commute=" + commute + ", city=" + city + ", state="
                + state + ", company=" + company + ", salary=" + salary + ", notes=" + notes + ", tech="
                + tech + "]";
    } 
}
