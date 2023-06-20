package com.phyoticGen.JHTracker.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phyoticGen.JHTracker.Model.Application;
import com.phyoticGen.JHTracker.Repository.ApplicationRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Override
    public List<Application> fetchAll() {
        return applicationRepository.findAll();
    }

    @Override
    public Application save(Application app) {
        return applicationRepository.save(app);
    }
}
