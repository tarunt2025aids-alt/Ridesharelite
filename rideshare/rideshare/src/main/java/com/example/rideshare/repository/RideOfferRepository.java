package com.example.rideshare.repository;

import com.example.rideshare.entity.RideOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RideOfferRepository
        extends JpaRepository<RideOffer, Long> {

    List<RideOffer> findByOriginAndDestination(
            String origin,
            String destination
    );
}
