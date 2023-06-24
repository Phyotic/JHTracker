package com.phyoticGen.JHTracker.Service;

import java.util.List;

import com.phyoticGen.JHTracker.Model.Application;

public interface ApplicationService {
    public List<Application> fetchAll();
    public Application save(Application app);
    public Application fetchApplicationById(Long id);
    public void deleteApplication(Long id);
    public Application updateApplication(Long id, Application app);
}
