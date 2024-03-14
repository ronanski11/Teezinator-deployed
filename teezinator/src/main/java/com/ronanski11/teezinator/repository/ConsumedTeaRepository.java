package com.ronanski11.teezinator.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ronanski11.teezinator.model.ConsumedTea;

@Repository
public interface ConsumedTeaRepository extends MongoRepository<ConsumedTea, String>{

	List<ConsumedTea> findByUser(String user);

}
