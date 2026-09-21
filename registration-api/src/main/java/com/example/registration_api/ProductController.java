package com.example.registration_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(
            ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productRepository.findAll()
        );
    }

    // GET product by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable Long id) {

        Optional<Product> product =
                productRepository.findById(id);

        if (product.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                product.get()
        );
    }

    // CREATE product
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestBody Product product) {

        if (product.getName() == null ||
                product.getName().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Product name is required");
        }

        if (product.getCategory() == null ||
                product.getCategory().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Category is required");
        }

        if (product.getPrice() == null ||
                product.getPrice() < 0) {

            return ResponseEntity.badRequest()
                    .body("Valid price is required");
        }

        if (product.getQuantity() == null ||
                product.getQuantity() < 0) {

            return ResponseEntity.badRequest()
                    .body("Valid quantity is required");
        }

        Product savedProduct =
                productRepository.save(product);

        return ResponseEntity.ok(savedProduct);
    }

    // UPDATE product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        Optional<Product> existingProduct =
                productRepository.findById(id);

        if (existingProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product updatedProduct =
                existingProduct.get();

        updatedProduct.setName(
                product.getName()
        );

        updatedProduct.setCategory(
                product.getCategory()
        );

        updatedProduct.setPrice(
                product.getPrice()
        );

        updatedProduct.setQuantity(
                product.getQuantity()
        );

        Product savedProduct =
                productRepository.save(updatedProduct);

        return ResponseEntity.ok(savedProduct);
    }

    // DELETE product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable Long id) {

        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);

        return ResponseEntity.ok(
                "Product deleted successfully"
        );
    }
}