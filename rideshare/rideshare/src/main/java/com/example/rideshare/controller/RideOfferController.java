package com.example.rideshare.controller;

import com.example.rideshare.entity.RideOffer;
import com.example.rideshare.repository.RideOfferRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rides")
public class RideOfferController {

    private final RideOfferRepository repository;

    public RideOfferController(RideOfferRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public RideOffer createRide(@RequestBody RideOffer ride) {
        return repository.save(ride);
    }

    @GetMapping
    public List<RideOffer> getRides() {
        return repository.findAll();
    }

    @GetMapping("/search")
    public List<RideOffer> searchRide(
            @RequestParam String origin,
            @RequestParam String destination) {

        return repository.findByOriginAndDestination(
                origin,
                destination
        );
    }
}