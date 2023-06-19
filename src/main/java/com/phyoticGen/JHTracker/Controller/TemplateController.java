package com.phyoticGen.JHTracker.Controller;

import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class TemplateController {

    @GetMapping("/templates/{template}")
    public ResponseEntity<String> getTemplate(@PathVariable String template) {
        String res = getFileResourceString("templates/" + template);

        if(res != null) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Retrieves the string representation of the passed file path.
    private String getFileResourceString(String path) {
        ClassPathResource resource = new ClassPathResource(path);

        try {
            String res = Files.readString(Path.of(resource.getURI()), StandardCharsets.UTF_8);
            return res;
        } catch (IOException e) {
            System.err.println("Could not retrieve file. " + e);
            return null;
        }
    }
}
