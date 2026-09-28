package com.example.rideshare.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "chemical_vault")
public class ChemicalVault {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vaultName;
    private String chemicalName;
    private String chemicalType;
    private double capacity;
    private double currentQuantity;
    private String safetyLevel;
    private String expiryDate;
    private String status;

    // getters and setters...
}