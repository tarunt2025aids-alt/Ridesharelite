package com.example.rideshare.repository;

import com.example.rideshare.entity.RideRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRequestRepository
        extends JpaRepository<RideRequest, Long> {
}
