package com.todobe.controller;

import com.todobe.dto.CreateTodoRequest;

import com.todobe.model.ToDo;
import com.todobe.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        ToDo todo = new ToDo();
        todo.setTitle(todoRequest.getTitle());
        todo.setDescription(todoRequest.getDescription()); // Set description
        todo.setCompleted(todoRequest.isCompleted());
        todo.setExpirationDate(todoRequest.getExpirationDate()); // Set expiration date
        return todoService.createTodo(todo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ToDo> updateTodo(@PathVariable Long id, @RequestBody ToDo todoDetails) {
        try {
            ToDo updatedTodo = todoService.updateTodo(id, todoDetails);
            updatedTodo.setDescription(todoDetails.getDescription()); // Update description
            updatedTodo.setExpirationDate(todoDetails.getExpirationDate()); // Update expiration date
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoById(@PathVariable Long id) {
        todoService.deleteTodoById(id);
        return ResponseEntity.noContent().build();
    }
}