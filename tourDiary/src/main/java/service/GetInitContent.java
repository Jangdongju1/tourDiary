package service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.Dao;
import model.DiaryWriter;

@Service
public class GetInitContent {
	@Autowired Dao getContent;
	public void getInitContent(HttpServletRequest request) {
		List<DiaryWriter> data = getContent.getInitContent();
		
		request.setAttribute("initData", data);
	}

}
