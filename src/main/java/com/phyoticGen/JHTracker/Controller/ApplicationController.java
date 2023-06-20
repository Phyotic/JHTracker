package com.phyoticGen.JHTracker.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phyoticGen.JHTracker.Model.Application;
import com.phyoticGen.JHTracker.Service.ApplicationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/Applications")
    public ResponseEntity<List<Application>> fetchAll() {
        List<Application> x = applicationService.fetchAll();

        return ResponseEntity.ok(x);
    }

    @PostMapping("/Applications")
    public ResponseEntity<Application> saveApplication(@RequestBody Application app) {
        applicationService.save(app);
        
        return ResponseEntity.ok(app);
    }
    
}
