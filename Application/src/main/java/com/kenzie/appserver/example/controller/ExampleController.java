package com.kenzie.appserver.example.controller;

import com.kenzie.appserver.example.service.ExampleService;
import com.kenzie.appserver.example.controller.model.ExampleCreateRequest;
import com.kenzie.appserver.example.controller.model.ExampleResponse;

import com.kenzie.appserver.example.service.model.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

import static java.util.UUID.randomUUID;

@RestController
@RequestMapping("/example")
public class ExampleController {

    private ExampleService exampleService;

    ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExampleResponse> get(@PathVariable("id") String id) {

        Example example = exampleService.findById(id);
        if (example == null) {
            return ResponseEntity.notFound().build();
        }

        ExampleResponse exampleResponse = new ExampleResponse();
        exampleResponse.setId(example.getId());
        exampleResponse.setName(example.getName());
        return ResponseEntity.ok(exampleResponse);
    }

    @PostMapping
    public ResponseEntity<ExampleResponse> addNewConcert(@RequestBody ExampleCreateRequest exampleCreateRequest) {
        Example example = new Example(randomUUID().toString(),
                exampleCreateRequest.getName());
        exampleService.addNewExample(example);

        ExampleResponse exampleResponse = new ExampleResponse();
        exampleResponse.setId(example.getId());
        exampleResponse.setName(example.getName());

        return ResponseEntity.created(URI.create("/example/" + exampleResponse.getId())).body(exampleResponse);
    }
}
