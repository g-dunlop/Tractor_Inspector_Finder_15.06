package com.codeclan.example.TractorFinder.controllers;

import com.codeclan.example.TractorFinder.models.Tractor;
import com.codeclan.example.TractorFinder.repositories.TractorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;

@RestController
public class TractorController {

    @Autowired
    TractorRepository tractorRepository;

    @GetMapping(value = "/tractors")
    public ResponseEntity<List<Tractor>> getAllTractors(){
        return new ResponseEntity<>(tractorRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value="/tractors/{id}")
    public ResponseEntity getTractor(@PathVariable Long id){
        return new ResponseEntity<>(tractorRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/tractors")
    public ResponseEntity<Tractor> postTractor(@RequestBody Tractor tractor){
        tractorRepository.save(tractor);
        return new ResponseEntity<>(tractor, HttpStatus.CREATED);
    }

    @PutMapping(value = "tractors/{id}")
    public ResponseEntity<Tractor> putTractor(@RequestBody Tractor tractor, @PathVariable Long id){
        Tractor tractorToUpdate = tractorRepository.findById(id).get();
        tractorToUpdate.setManufacturer(tractor.getManufacturer());
        tractorRepository.save(tractorToUpdate);
        return new ResponseEntity<>(tractorToUpdate, HttpStatus.OK);
    }

    @DeleteMapping(value = "tractors/{id}")
    public ResponseEntity<Long> deleteTractor(@PathVariable Long id){
        tractorRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
