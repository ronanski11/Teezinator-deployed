package com.ronanski11.teezinator.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document
@Data
public class ConsumedTea {
	
	@Id
	private String id;
	
	@DBRef
	private Tea tea;
	
	private String user;
	
	String image;
	
	private LocalDateTime time;

}
