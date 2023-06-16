package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.DiaryDao;
import model.DiaryWriter;
import model.Search;

@Service
public class GetKeywordSearchContent {
	@Autowired DiaryDao getContent;
	@Autowired Gson jsonParse;
	public String getKeywordSearchContent(Search searchParam) {
		List<DiaryWriter> data = getContent.getSearchContent(searchParam);
		String searchData = jsonParse.toJson(data);
		
		return searchData;
	}

}
