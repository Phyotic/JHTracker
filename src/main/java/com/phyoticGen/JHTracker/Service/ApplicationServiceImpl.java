package com.phyoticGen.JHTracker.Service;

import java.lang.reflect.Field;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.phyoticGen.JHTracker.Model.Application;
import com.phyoticGen.JHTracker.Repository.ApplicationRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private final static String APPLICATION_ID = "id";

    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Override
    public List<Application> fetchAll() {
        return applicationRepository.findAll();
    }

    @Override
    public Application fetchApplicationById(Long id) {
        return applicationRepository.findById(id).get();
    }

    @Override
    public Application save(Application app) {
        return applicationRepository.save(app);
    }

    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    @Override
    public Application updateApplication(Long id, Application app) {
        Application rec = applicationRepository.findById(id).get();

        sanitizeNumbers(rec, app);

        Field[] fields = rec.getClass().getDeclaredFields();

        for(Field field : fields) {
            if(!field.getName().equals(APPLICATION_ID)) {
                field.setAccessible(true);

                try {
                    Object appValue = field.get(app);

                    if(appValue != null) {
                        Object recValue = field.get(rec);

                        if(!isEqual(appValue, recValue)) {
                            field.set(rec, appValue);
                        }
                    }
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }

        applicationRepository.save(rec);
        return rec;
    }

    private void sanitizeNumbers(Application old, Application update) {
        if(update.getSalary() == 0.0) {
            update.setSalary(old.getSalary());
        }

        if(update.getCommute() == 0) {
            update.setCommute(old.getCommute());
        }
    }

    private boolean isEqual(Object val1, Object val2) {
        if(val1.getClass().isAssignableFrom(Number.class) && val2.getClass().isAssignableFrom(Number.class)) {
            return compareNumbers(val1, val2);
        }

        return val1.equals(val2);
    }

    private boolean compareNumbers(Object val1, Object val2) {
        if(val1 instanceof Number && val2 instanceof Number) {
            Number num1 = (Number) val1;
            Number num2 = (Number) val2;
            return num1.doubleValue() == num2.doubleValue();
        }
        return false;
    }
}