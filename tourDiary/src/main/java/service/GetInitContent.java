package service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dao.DiaryDao;
import model.DiaryWriter;

@Service
public class GetInitContent {
	@Autowired DiaryDao getContent;
	public void getInitContent(HttpServletRequest request) {
		List<DiaryWriter> data = getContent.getInitContent();
		
		request.setAttribute("initData", data);
	}

}
