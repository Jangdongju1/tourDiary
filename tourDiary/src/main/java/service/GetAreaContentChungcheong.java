package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.DiaryDao;
import model.DiaryWriter;
import model.Search;

@Service
public class GetAreaContentChungcheong {
	@Autowired DiaryDao getContent;
	@Autowired Gson jsonParse;
	public String getChungcheongContent(Search searchParam) {
		List<DiaryWriter> data = getContent.getAreaContent(searchParam);
		String chungcheongData = jsonParse.toJson(data);
		
		return chungcheongData;
	}

}
