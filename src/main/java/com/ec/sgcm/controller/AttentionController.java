package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Attention;
import com.ec.sgcm.services.AttentionService;

@RestController
@RequestMapping("/atentionRest")
public class AttentionController {

    @Autowired
    AttentionService attentionService;

    @CrossOrigin(origins = "*")
    @PostMapping("/createNewAtention")
    @ResponseBody
    public ResponseEntity<Attention> createNewAtention(@RequestBody Attention antecedents) {
        return ResponseEntity.ok().body(attentionService.createNewAttentio(antecedents));
    }

}
