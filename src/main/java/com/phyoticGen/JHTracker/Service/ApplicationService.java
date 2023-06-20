package com.phyoticGen.JHTracker.Service;

import java.util.List;

import com.phyoticGen.JHTracker.Model.Application;

public interface ApplicationService {
    public List<Application> fetchAll();
    public Application save(Application app);
}
