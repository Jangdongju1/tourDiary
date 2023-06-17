package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.DiaryDao;
import model.Attraction;

@Service
public class MapSearch {
	@Autowired DiaryDao search;	
	@Autowired Gson jsonParse;
	public String searchData(String keyword) {
		List<Attraction> data = search.getSearchCourse(keyword);
		String jsonData = jsonParse.toJson(data);
		
		
		return jsonData;
	}

}
