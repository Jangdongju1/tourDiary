package controller;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import model.CombinedLists;
import service.GetAttraction;
import service.GetCourse;
import service.MapSearch;
import service.RegDiary;

@Controller
public class diaryController {
	@Autowired GetCourse getCourse;
	@Autowired MapSearch searchData;
	@Autowired GetAttraction getAttraction;
	@Autowired RegDiary regDiary;
	
	@RequestMapping(value = "getcourses", method = RequestMethod.GET)
	public String getCourse(HttpServletRequest request) {
		String data = getCourse.getCourseinfo();
		request.setAttribute("courseData", data);
		
		return "coursePick.jsp";
	}
	
	@RequestMapping(value = "courseSearch", method = RequestMethod.POST)
	@ResponseBody
	public String courseSearch(@RequestParam("keyword") String keyword) {  //지도 검색Ajax요청에 대해서 요청 본문에 응답을 주는 부분.
		String jsonData = searchData.searchData(keyword);
		
		return jsonData;
	}
	
	@RequestMapping(value = "getAttracitonInfo", method = RequestMethod.POST)
	public String diaryWrite(@RequestParam("jsonData") String jsonData, HttpServletRequest request) {
		CombinedLists lists = getAttraction.getInfo(jsonData);
		request.setAttribute("lists", lists);
		
		return "DiaryWrite.jsp";
	}

	@RequestMapping(value = "regDiary", method = RequestMethod.POST)
	public void diaryReg(HttpServletRequest request) {
		regDiary.insertDiary(request);
		
	}
	
}
