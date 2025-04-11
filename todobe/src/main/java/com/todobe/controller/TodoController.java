package com.todobe.controller;

import com.todobe.dto.CreateTodoRequest;

import com.todobe.model.ToDo;
import com.todobe.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<ToDo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ToDo createTodo(@RequestBody CreateTodoRequest todoRequest) {
        if (todoRequest.getStartDate() == null) {
            throw new IllegalArgumentException("Start date is required.");
        }
        if (todoRequest.getExpirationDate() != null &&
            todoRequest.getExpirationDate().isBefore(todoRequest.getStartDate())) {
            throw new IllegalArgumentException("Expiration date cannot be earlier than start date.");
        }
    
        ToDo todo = new ToDo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription());
        todo.setStartDate(todoRequest.getStartDate());
        todo.setExpirationDate(todoRequest.getExpirationDate());
        todo.setPriority(todoRequest.getPriority());
        todo.setTags(todoRequest.getTags());
        return todoService.createTodo(todo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable Long id, @RequestBody ToDo todoDetails) {
        ToDo existingTodo = todoService.getTodoById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    
        // Cập nhật các trường
        existingTodo.setStartDate(todoDetails.getStartDate()); // Lưu thời gian dưới dạng UTC
        existingTodo.setExpirationDate(todoDetails.getExpirationDate());
        existingTodo.setTitle(todoDetails.getTitle());
        existingTodo.setDescription(todoDetails.getDescription());
        existingTodo.setPriority(todoDetails.getPriority());
        existingTodo.setTags(todoDetails.getTags());
    
        ToDo updatedTodo = todoService.updateTodo(id, existingTodo);
        return ResponseEntity.ok(updatedTodo);
    }

        @PatchMapping("/{id}/complete")
    public ResponseEntity<ToDo> markAsCompleted(@PathVariable Long id) {
        ToDo todo = todoService.getTodoById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        todo.setCompleted(true);
        ToDo updatedTodo = todoService.updateTodo(id, todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        try {
            todoService.deleteTodoById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}