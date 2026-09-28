package com.example.rideshare.service;


import com.example.rideshare.entity.RideOffer;
import com.example.rideshare.repository.RideOfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideOfferService {

    private final RideOfferRepository rideRepository;

    public RideOfferService(RideOfferRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public RideOffer createRide(RideOffer ride) {

        if (ride.getSeatsAvailable() <= 0) {
            throw new RuntimeException("Seats must be greater than zero");
        }

        return rideRepository.save(ride);
    }

    public List<RideOffer> getAllRides() {
        return rideRepository.findAll();
    }

    public RideOffer getRideById(Long id) {
        return rideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }

    public List<RideOffer> searchRide(
            String origin,
            String destination) {

        return rideRepository.findByOriginAndDestination(
                origin,
                destination
        );
    }
}