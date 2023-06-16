package service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.SignUpDao;
import model.User;

@Service
public class UserNickNameCheck {
	@Autowired SignUpDao check;
	public String userNickNameCheck(User userNick) {
		boolean success = check.nickNameCheck(userNick);
		String checkResult = "{\"success\" : \""+success+"\"}";
		
		return checkResult;
	}

}
