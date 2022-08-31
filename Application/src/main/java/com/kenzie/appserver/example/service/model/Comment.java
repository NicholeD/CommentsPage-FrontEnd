package com.kenzie.appserver.example.service.model;

public class Comment {
    private final String id;
    private final String owner;
    private final String title;
    private final String content;

    public Comment(String id, String owner, String title, String content) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.content = content;
    }

    public String getId() { return this.id; }

    public String getOwner() { return this.owner; }

    public String getTitle() { return this.title; }

    public String getContent() { return this.content; }
}
