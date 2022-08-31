package com.kenzie.appserver.example.controller;

import com.kenzie.appserver.example.controller.model.CommentCreateRequest;
import com.kenzie.appserver.example.controller.model.CommentResponse;
import com.kenzie.appserver.example.service.CommentService;
import com.kenzie.appserver.example.service.model.Comment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.UUID.randomUUID;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private CommentService commentService;

    CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponse> getComment(@PathVariable("id") String id) {

        Comment comment = commentService.findById(id);
        if (comment == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(commentToResponse(comment));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CommentResponse>> getComment() {

        List<Comment> comments = commentService.findAll();

        List<CommentResponse> responses = comments.stream().map(comment -> commentToResponse(comment)).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<CommentResponse> addNewComment(@RequestBody CommentCreateRequest commentCreateRequest) {
        Comment comment = new Comment(randomUUID().toString(), commentCreateRequest.getOwner(), commentCreateRequest.getTitle(),
                commentCreateRequest.getContent());
        commentService.addNewComment(comment);

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(comment.getId());
        commentResponse.setOwner(comment.getOwner());
        commentResponse.setContent(comment.getContent());
        commentResponse.setTitle(comment.getTitle());

        return ResponseEntity.created(URI.create("/comment/" + commentResponse.getId())).body(commentResponse);
    }

    private CommentResponse commentToResponse(Comment comment) {
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(comment.getId());
        commentResponse.setOwner(comment.getOwner());
        commentResponse.setTitle(comment.getTitle());
        commentResponse.setContent(comment.getContent());
        return commentResponse;
    }
}
