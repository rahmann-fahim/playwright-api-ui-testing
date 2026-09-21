package com.example.registration_api;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository
        extends JpaRepository<Sale, Long> {
}