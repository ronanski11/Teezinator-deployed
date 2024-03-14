package com.ronanski11.teezinator.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ronanski11.teezinator.model.ConsumedTea;
import com.ronanski11.teezinator.model.Image;
import com.ronanski11.teezinator.model.Role;
import com.ronanski11.teezinator.model.Tea;
import com.ronanski11.teezinator.model.User;
import com.ronanski11.teezinator.repository.ConsumedTeaRepository;
import com.ronanski11.teezinator.repository.ImageRepository;
import com.ronanski11.teezinator.repository.TeaRepository;
import com.ronanski11.teezinator.repository.UserRepository;

@Service
public class TeaService {
	
	@Autowired
	private TeaRepository teaRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ConsumedTeaRepository consumedTeaRepository;
	
	@Autowired
	ImageRepository imageRepository;
	
	public ConsumedTea addTea(String username, String teaId, LocalDateTime timeOfConsumption, MultipartFile image) {
		ConsumedTea consumedTea = new ConsumedTea();
		if (timeOfConsumption != null) {
			consumedTea.setTime(timeOfConsumption);
		} else {
			consumedTea.setTime(LocalDateTime.now());
		}
		consumedTea.setTea(teaRepository.findById(teaId).get());
		consumedTea.setUser(username);
		if (image != null) {
			consumedTea.setImage(imageRepository.save(new Image(convertToBase64String(image))).getId());
		} else {
			consumedTea.setImage(null);
		}
		return consumedTeaRepository.save(consumedTea);
	}
	
	private String convertToBase64String(MultipartFile imageFile) {
		 String base64Image = "";
	        try {
	            // Convert the image to Base64
	            byte[] fileContent = imageFile.getBytes();
	            base64Image = Base64.getEncoder().encodeToString(fileContent);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		return base64Image;
	}

	public List<Tea> getAllTeas() {
		List<Tea> allTeas = teaRepository.findAll();
		for (Tea tea : allTeas) {
			tea.setImage(imageRepository.findById(tea.getImage()).get().getBaseString());
		}
		return allTeas;
	}
	
	public Tea findById(String teaId) {
		return teaRepository.findById(teaId).get();
	}

	public Role getUserRole(String username) {
		return userRepository.findByUsername(username).get().getRole();
	}
	
	public List<String> getAllUsernames() {
		List<String> usernames = new ArrayList<String>();
		for (User user : userRepository.findAll()) {
			usernames.add(user.getUsername());
		}
		return usernames;
	}

	public List<Tea> getMultipleById(String[] ids) {
		List<Tea> teas = new ArrayList<Tea>();
		for (String id : ids) {
			Tea tea = teaRepository.findById(id).get();
			tea.setImage(imageRepository.findById(tea.getImage()).get().getBaseString());
			teas.add(tea);
		}
		return teas;
	}

}
