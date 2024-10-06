package com.ec.sgcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ec.sgcm.model.Attentions;
import com.ec.sgcm.services.AttentionService;

@RestController
@RequestMapping("/atentionRest")
public class AttentionController {

    @Autowired
    AttentionService attentionService;

    @PostMapping("/createNewAtention")
    @ResponseBody
    public ResponseEntity<Attentions> createNewAtention(@RequestBody Attentions antecedents) {
        return ResponseEntity.ok().body(attentionService.createNewAttentio(antecedents));
    }

}
