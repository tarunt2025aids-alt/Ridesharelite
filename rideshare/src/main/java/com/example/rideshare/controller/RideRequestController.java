package com.example.rideshare.controller;

import com.example.rideshare.entity.RideRequest;
import com.example.rideshare.repository.RideRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ride-requests")
public class RideRequestController {

    private final RideRequestRepository rideRequestRepository;

    public RideRequestController(RideRequestRepository rideRequestRepository) {
        this.rideRequestRepository = rideRequestRepository;
    }

    @PostMapping
    public RideRequest createRideRequest(@RequestBody RideRequest rideRequest) {
        return rideRequestRepository.save(rideRequest);
    }

    @GetMapping
    public List<RideRequest> getAllRideRequests() {
        return rideRequestRepository.findAll();
    }

    @GetMapping("/{id}")
    public RideRequest getRideRequestById(@PathVariable Long id) {
        return rideRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride request not found with ID: " + id));
    }
}
