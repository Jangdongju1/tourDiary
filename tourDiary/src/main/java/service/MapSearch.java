package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.Dao;
import model.Attraction;

@Service
public class MapSearch {
	@Autowired Dao search;	
	public String searchData(String keyword) {
		List<Attraction> data = search.getSearchCourse(keyword);

		Gson json = new Gson();
		String jsonData = json.toJson(data);
		
		
		return jsonData;
	}

}
