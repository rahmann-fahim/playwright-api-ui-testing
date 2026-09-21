package com.example.registration_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:4200")
public class SaleController {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleController(
            SaleRepository saleRepository,
            ProductRepository productRepository) {

        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }


    // =========================
    // GET ALL SALES
    // =========================

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {

        return ResponseEntity.ok(
                saleRepository.findAll()
        );
    }


    // =========================
    // GET SALE BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<?> getSaleById(
            @PathVariable Long id) {

        Optional<Sale> sale =
                saleRepository.findById(id);

        if (sale.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                sale.get()
        );
    }


    // =========================
    // CREATE SALE
    // =========================

    @PostMapping
    public ResponseEntity<?> createSale(
            @RequestBody SaleRequest request) {

        if (request.getProductId() == null) {

            return ResponseEntity.badRequest()
                    .body("Product is required");
        }

        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            return ResponseEntity.badRequest()
                    .body("Valid quantity is required");
        }


        Optional<Product> productOptional =
                productRepository.findById(
                        request.getProductId()
                );

        if (productOptional.isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Product not found");
        }


        Product product =
                productOptional.get();


        // Check stock
        if (product.getQuantity()
                < request.getQuantity()) {

            return ResponseEntity.badRequest()
                    .body("Insufficient product stock");
        }


        // Use current product price
        Double unitPrice =
                product.getPrice();


        Double totalPrice =
                unitPrice * request.getQuantity();


        // Create sale
        Sale sale = new Sale();

        sale.setProduct(product);

        sale.setQuantity(
                request.getQuantity()
        );

        sale.setUnitPrice(
                unitPrice
        );

        sale.setTotalPrice(
                totalPrice
        );

        sale.setSaleDate(
                LocalDateTime.now()
        );


        // Reduce product stock
        product.setQuantity(
                product.getQuantity()
                - request.getQuantity()
        );


        // Save product
        productRepository.save(product);


        // Save sale
        Sale savedSale =
                saleRepository.save(sale);


        return ResponseEntity.ok(
                savedSale
        );
    }


    // =========================
    // UPDATE SALE
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSale(
            @PathVariable Long id,
            @RequestBody SaleRequest request) {

        Optional<Sale> saleOptional =
                saleRepository.findById(id);

        if (saleOptional.isEmpty()) {

            return ResponseEntity.notFound()
                    .build();
        }


        if (request.getQuantity() == null ||
                request.getQuantity() <= 0) {

            return ResponseEntity.badRequest()
                    .body("Valid quantity is required");
        }


        Sale sale =
                saleOptional.get();


        Product oldProduct =
                sale.getProduct();


        int oldQuantity =
                sale.getQuantity();


        // Restore old stock first
        oldProduct.setQuantity(
                oldProduct.getQuantity()
                + oldQuantity
        );


        Optional<Product> productOptional =
                productRepository.findById(
                        request.getProductId()
                );


        if (productOptional.isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Product not found");
        }


        Product newProduct =
                productOptional.get();


        // Check new stock
        if (newProduct.getQuantity()
                < request.getQuantity()) {

            // Restore original state
            oldProduct.setQuantity(
                    oldProduct.getQuantity()
                    - oldQuantity
            );

            return ResponseEntity.badRequest()
                    .body("Insufficient product stock");
        }


        Double unitPrice =
                newProduct.getPrice();


        Double totalPrice =
                unitPrice * request.getQuantity();


        sale.setProduct(
                newProduct
        );

        sale.setQuantity(
                request.getQuantity()
        );

        sale.setUnitPrice(
                unitPrice
        );

        sale.setTotalPrice(
                totalPrice
        );


        // Reduce new product stock
        newProduct.setQuantity(
                newProduct.getQuantity()
                - request.getQuantity()
        );


        productRepository.save(oldProduct);

        productRepository.save(newProduct);


        Sale updatedSale =
                saleRepository.save(sale);


        return ResponseEntity.ok(
                updatedSale
        );
    }


    // =========================
    // DELETE SALE
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(
            @PathVariable Long id) {

        Optional<Sale> saleOptional =
                saleRepository.findById(id);

        if (saleOptional.isEmpty()) {

            return ResponseEntity.notFound()
                    .build();
        }


        Sale sale =
                saleOptional.get();


        Product product =
                sale.getProduct();


        // Restore sold quantity
        product.setQuantity(
                product.getQuantity()
                + sale.getQuantity()
        );


        productRepository.save(product);


        saleRepository.deleteById(id);


        return ResponseEntity.ok(
                "Sale deleted successfully"
        );
    }


    // =========================
    // SALE REQUEST DTO
    // =========================

    public static class SaleRequest {

        private Long productId;

        private Integer quantity;


        public Long getProductId() {
            return productId;
        }


        public void setProductId(
                Long productId) {

            this.productId = productId;
        }


        public Integer getQuantity() {
            return quantity;
        }


        public void setQuantity(
                Integer quantity) {

            this.quantity = quantity;
        }
    }
}