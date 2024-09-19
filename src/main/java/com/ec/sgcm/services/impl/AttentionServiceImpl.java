package com.ec.sgcm.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ec.sgcm.model.Attention;
import com.ec.sgcm.repository.AttentionRepo;
import com.ec.sgcm.services.AttentionService;

@Service
public class AttentionServiceImpl implements AttentionService {

    @Autowired
    AttentionRepo attentionRepo;

    @Override
    public Attention createNewAttentio(Attention attention) {
        return attentionRepo.save(attention);
    }

}
