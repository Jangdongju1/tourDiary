package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.Dao;
import model.Attraction;

@Service
public class GetCourse {
	@Autowired Dao getCourseInfo;
	
	public String getCourseinfo() {
		List<Attraction> data = getCourseInfo.getCourse();
		
		Gson json = new Gson();
		String jsonList = json.toJson(data);
		System.out.println(jsonList);
		return jsonList;
	}

}
