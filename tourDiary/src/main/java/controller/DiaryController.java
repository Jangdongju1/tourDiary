package controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import model.CombinedLists;
import model.Search;
import service.GetAreaContentChungcheong;
import service.GetAreaContentGangwon;
import service.GetAreaContentGyeonsang;
import service.GetAreaContentJeju;
import service.GetAreaContentJeolla;
import service.GetAreaContentSeoul;
import service.GetAreaContentTotal;
import service.GetAttraction;
import service.GetCourse;
import service.GetDiaryData;
import service.GetInitContent;
import service.GetKeywordSearchContent;
import service.InsertDiary;
import service.MapSearch;

@Controller
public class DiaryController {
	@Autowired GetCourse getCourse;
	@Autowired MapSearch searchData;
	@Autowired GetAttraction getAttraction;
	@Autowired InsertDiary regDiary;
	@Autowired GetDiaryData getDiary;
	@Autowired GetInitContent getContent;
	@Autowired GetAreaContentTotal getTotalContent;
	@Autowired GetAreaContentJeju getJeju;
	@Autowired GetAreaContentSeoul getSeoul;
	@Autowired GetAreaContentGangwon getgangwon;
	@Autowired GetAreaContentChungcheong getchungcheong;
	@Autowired GetAreaContentGyeonsang getgyeonsang;
	@Autowired GetAreaContentJeolla getJeolla;
	@Autowired GetKeywordSearchContent getSearchContent;

	
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
	
	@RequestMapping(value = "getInitContent", method = RequestMethod.GET)
	public String getInitContent(HttpServletRequest request) {
		getContent.getInitContent(request);
		
		return "TotalContents.jsp";
	}
	@RequestMapping(value = "area/total", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getTotalContent(@RequestBody Search searchParam) {
		String totalData = getTotalContent.getAreaContentTotal(searchParam);
		
		return totalData;
	}
	
	@RequestMapping(value = "area/jeju", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentJeju(@RequestBody Search searchParam) {
		String jejuData = getJeju.getJejuContent(searchParam);
		
		return jejuData;
	}
	
	@RequestMapping(value = "area/seoul", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentSeoul(@RequestBody Search searchParam) {
		String seoulData = getSeoul.getSeoulContent(searchParam);
		
		return seoulData;
	}
	
	@RequestMapping(value = "area/gangwon", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentGangwon(@RequestBody Search searchParam) {
		String gangwonData = getgangwon.getGangwonContent(searchParam);
		
		return gangwonData;
	}
	
	@RequestMapping(value = "area/chungcheong", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentChungcheong(@RequestBody Search seachParam) {
		String chungcheongData = getchungcheong.getChungcheongContent(seachParam);
		
		return chungcheongData;
	}
	
	@RequestMapping(value = "area/gyeonsang", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentGyeonsang(@RequestBody Search searchParam) {
		String gyeonsangData = getgyeonsang.getAreaContentGyeonsang(searchParam);
		
		return gyeonsangData;
	}
	@RequestMapping(value = "area/jeolla", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String getAreaContentJeolla(@RequestBody Search searchParam) {
		String jeollaData = getJeolla.getAreaContentJeolla(searchParam);
		
		return jeollaData;
	}
	@RequestMapping(value = "keywordSearch", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String keywordSearch(@RequestBody Search searchParam) {
		String searchData = getSearchContent.getKeywordSearchContent(searchParam);
		
		return searchData;
	}
	
}
