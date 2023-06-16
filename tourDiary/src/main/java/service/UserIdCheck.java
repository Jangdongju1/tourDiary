package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.SignUpDao;
import model.User;

@Service
public class UserIdCheck {
	@Autowired SignUpDao check;
	
	public String userIdCheck(User userId) {
		boolean success = check.idCheck(userId);
		String checkResult = "{\"success\": \"" + success + "\"}";
		
		
		return checkResult;
	}

}
