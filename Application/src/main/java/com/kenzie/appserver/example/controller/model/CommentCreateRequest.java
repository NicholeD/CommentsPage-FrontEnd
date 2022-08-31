package com.kenzie.appserver.example.controller.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;

public class CommentCreateRequest {

    @NotEmpty
    @JsonProperty("owner")
    private String owner;
    @JsonProperty("title")
    private String title;
    @JsonProperty("content")
    private String content;

    public String getContent() {
        return content;
    }

    public String getTitle() {
        return title;
    }

    public String getOwner() {
        return owner;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setOwner(String owner) { this.owner = owner; }

    public void setTitle(String title) { this.title = title; }
}
