package com.example.rideshare.entity;

import jakarta.persistence.*;

@Entity
public class RideRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User rider;

    @ManyToOne
    private RideOffer rideOffer;

    private String status;

    public RideRequest() {
    }

    public Long getId() {
        return id;
    }

    public User getRider() {
        return rider;
    }

    public void setRider(User rider) {
        this.rider = rider;
    }

    public RideOffer getRideOffer() {
        return rideOffer;
    }

    public void setRideOffer(RideOffer rideOffer) {
        this.rideOffer = rideOffer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
