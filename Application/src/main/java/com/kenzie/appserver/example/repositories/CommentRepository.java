package com.kenzie.appserver.example.repositories;

import com.kenzie.appserver.example.repositories.model.CommentRecord;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface CommentRepository extends CrudRepository<CommentRecord, String> {
}
