package controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.User;
import service.UserLogIn;

@Controller
public class SignInController {
	@Autowired UserLogIn login;
	
	@RequestMapping(value = "loginProcess", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String loginProcess(@RequestBody User userInfo) {
		String result = login.userLogIn(userInfo);
		
		return result;
	}

}
