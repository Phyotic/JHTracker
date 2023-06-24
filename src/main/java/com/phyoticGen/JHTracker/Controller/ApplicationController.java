package com.phyoticGen.JHTracker.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.phyoticGen.JHTracker.Model.Application;
import com.phyoticGen.JHTracker.Service.ApplicationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/Applications")
    public ResponseEntity<List<Application>> fetchAll() {
        List<Application> x = applicationService.fetchAll();

        return ResponseEntity.ok(x);
    }

    @GetMapping("/Applications/{id}")
    public ResponseEntity<Application> fetchApplicationByID(@PathVariable Long id) {
        Application app = applicationService.fetchApplicationById(id);

        return ResponseEntity.ok(app);
    }

    @PostMapping("/Applications")
    public ResponseEntity<Application> saveApplication(@RequestBody Application app) {
        applicationService.save(app);
        
        return ResponseEntity.ok(app);
    }

    @DeleteMapping("/Applications/{id}")
    public void deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
    }
    
    //TODO
    @PutMapping("/Applications/{id}")
    public ResponseEntity<Application> updateApp(@PathVariable Long id, @RequestBody Application app) {
        return ResponseEntity.ok(applicationService.updateApplication(id, app));
    }
}
