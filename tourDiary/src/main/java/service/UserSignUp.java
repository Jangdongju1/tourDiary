package service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import dao.SignUpDao;
import model.User;

@Service
public class UserSignUp {
	@Autowired SignUpDao insertData;

	public boolean signup(User userData, HttpServletRequest request) {
		// 이메일이 @기준으로 나누어져 있으므로 합쳐서 세팅해준다.
		String email = request.getParameter("email_first") + "@"+ request.getParameter("emailVal");
		userData.setEmail(email);
	
		boolean result = insertData.signUp(userData);
		
		return result;
	}

}
