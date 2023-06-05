package controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import model.Attraction;
import service.GetCourse;

@Controller
public class diaryController {
	@Autowired GetCourse getCourse;
	
	@RequestMapping(value = "getcourses", method = RequestMethod.GET)
	public String getCourse(HttpServletRequest resq) {
		String data = getCourse.getCourseinfo();
		resq.setAttribute("courseData", data);
		
		return "coursePick.jsp";
	}
	
}
