package com.todobe.service;

import com.todobe.model.ToDo;
import com.todobe.repository.TodoRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<ToDo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Optional<ToDo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    public ToDo createTodo(ToDo todo) {
        return todoRepository.save(todo);
    }

    public ToDo updateTodo(Long id, ToDo updatedTodo) {
        // Lưu task đã cập nhật
        return todoRepository.save(updatedTodo);
    }
    
    @Transactional
    public void deleteTodoById(Long id) {
        todoRepository.deleteById(id);
    }
}