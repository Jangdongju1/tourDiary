package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

import dao.Dao;
import model.DiaryWriter;
import model.Search;

@Service
public class GetAreaContentGyeonsang {
	@Autowired Dao getContent;
	@Autowired Gson jsonParse;
	public String getAreaContentGyeonsang(Search searchParam) {
		List<DiaryWriter> data = getContent.getAreaContent(searchParam);
		String gyeonsangData = jsonParse.toJson(data);
		
		return gyeonsangData;
	}

}
