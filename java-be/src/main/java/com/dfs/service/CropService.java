package com.dfs.service;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CropService {

    /** Supported crop names for fertilizer suggestion (sorted alphabetically, first letter capitalized). */
    private static final List<String> CROPS = Collections.unmodifiableList(
            Stream.of(
                    "Apple", "Banana", "Blackgram", "Chickpea", "Coconut", "Coffee", "Cotton",
                    "Grapes", "Jute", "Kidneybeans", "Lentil", "Maize", "Mango", "Mothbeans",
                    "Mungbean", "Muskmelon", "Orange", "Papaya", "Pigeonpeas", "Pomegranate",
                    "Rice", "Watermelon"
            ).sorted().collect(Collectors.toList())
    );

    public List<String> getCrops() {
        return CROPS;
    }
}
