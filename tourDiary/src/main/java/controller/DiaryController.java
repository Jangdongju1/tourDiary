package controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import model.CombinedLists;
import model.DiaryWriter;
import model.Search;
import service.GETAreaContentTotal;
import service.GetAttraction;
import service.GetCourse;
import service.GetDiaryData;
import service.GetInitContent;
import service.MapSearch;
import service.RegDiary;

@Controller
public class DiaryController {
	@Autowired GetCourse getCourse;
	@Autowired MapSearch searchData;
	@Autowired GetAttraction getAttraction;
	@Autowired RegDiary regDiary;
	@Autowired GetDiaryData getDiary;
	@Autowired GetInitContent getContent;
	@Autowired GETAreaContentTotal getTotalContent;
	
	@RequestMapping(value = "getCourses", method = RequestMethod.GET)
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
	public String diaryReg(HttpServletRequest request) {
		boolean success = regDiary.insertDiary(request);
		
		if(success) {
			return "DiaryDataProcess.jsp";
		}else {
			return ""; // insert 실패시 보여줄 페이지.
		}
		
	}
	
	@RequestMapping(value = "getDiaryData", method = RequestMethod.GET)
	public String getDiaryData(@RequestParam("post_Num") int postNum, HttpServletRequest request) {
		getDiary.getDiaryData(postNum, request);
		
		return "DiaryView.jsp";
	}
	
	@RequestMapping(value = "getInitContent", method = RequestMethod.POST)
	public String getInitContent(HttpServletRequest request) {
		getContent.getInitContent(request);
		
		return "TotalContents.jsp";
	}
	@RequestMapping(value = "area/total", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getTotalContent(@RequestBody Search serchParam) {
		String jsonData = getTotalContent.getAreaContentTotal(serchParam);
		
		return jsonData;
	}
	
}
