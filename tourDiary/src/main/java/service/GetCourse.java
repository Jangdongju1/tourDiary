package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.DiaryDao;
import model.Attraction;

@Service
public class GetCourse {
	@Autowired DiaryDao getCourseInfo;
	
	public String getCourseinfo() {
		List<Attraction> data = getCourseInfo.getCourse();
		// 리스트 형태의 데이터를 Json 형태로 문자화 한다. 
		Gson json = new Gson();
		String jsonList = json.toJson(data);
		return jsonList;
	}

}
