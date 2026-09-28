package com.example.rideshare.controller;

import com.example.rideshare.entity.RideOffer;
import com.example.rideshare.service.RideOfferService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rides")
public class RideOfferController {

    private final RideOfferService rideOfferService;

    public RideOfferController(RideOfferService rideOfferService) {
        this.rideOfferService = rideOfferService;
    }

    @PostMapping
    public RideOffer createRide(@RequestBody RideOffer ride) {
        return rideOfferService.createRide(ride);
    }

    @GetMapping
    public List<RideOffer> getRides() {
        return rideOfferService.getAllRides();
    }

    @GetMapping("/{id}")
    public RideOffer getRideById(@PathVariable Long id) {
        return rideOfferService.getRideById(id);
    }

    @GetMapping("/search")
    public List<RideOffer> searchRide(
            @RequestParam String origin,
            @RequestParam String destination) {
        return rideOfferService.searchRide(origin, destination);
    }
}