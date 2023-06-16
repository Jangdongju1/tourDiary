package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.SignInDao;
import model.User;

@Service
public class UserLogIn{
	@Autowired SignInDao login;

	public String userLogIn(User userInfo) {
		List<User> loginData = login.loginProcess(userInfo);
		int status = 0;
		
		if(loginData.size() != 0) {
			if(loginData.get(0).getPassword().equals(userInfo.getPassword())) {
				status = 1; // 로그인 성공
			}else {
				status = 0; // 비밀번호가 틀린 경우.
			}
		}else {
			status = 2; // 아이디가 없는경우
		}
		String result = "{\"status\" : "+status+"}";
		
		
		return result;
	}

}
