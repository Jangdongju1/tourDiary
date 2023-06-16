package controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.User;
import service.UserIdCheck;
import service.UserNickNameCheck;
import service.UserSignUp;

@Controller
public class SignupController {
	@Autowired UserIdCheck idCheck;
	@Autowired UserNickNameCheck nickNameCheck;
	@Autowired UserSignUp insertUserData;
	
	@RequestMapping(value = "idCheck", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String idCheck(@RequestBody User userId) {
		String checkResult = idCheck.userIdCheck(userId);
		
		return checkResult;
	}
	
	@RequestMapping(value = "nickNameCheck", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String nickNameCheck(@RequestBody User userNick) {
		String checkResult = nickNameCheck.userNickNameCheck(userNick);
		
		return checkResult;
	}
	
	@RequestMapping(value = "userSignUp", method = RequestMethod.POST)
	public String insertUserData(@ModelAttribute("User") User userData, HttpServletRequest request) {
		boolean result = insertUserData.signup(userData, request);
		String nextPage = "";
		
		if(result == true) {
			nextPage =  "SignIn.jsp";
		}else {
			// 실페시 띄울페이지 
		}
		return nextPage;
	}

}
