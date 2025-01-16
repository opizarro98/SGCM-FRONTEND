package com.ec.sgcm.model.dto;

import com.ec.sgcm.model.Histories;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryPerson {
    Histories history;
    String diagnostic;
    String antecedents;
}
