package service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dao.DiaryDao;
import factory.StringBuliderFactory;
import model.Attraction;
import model.CombinedLists;
import model.DiaryWriter;

@Service
public class GetAttraction {
	@Autowired StringBuliderFactory beanFactory;
	private final ObjectMapper objectMapper;
	// 서로다른 속성의 JSON 배열들을 서버에서 처리하기 위해서 Jackson 라이브러리를 Bean으로 등록하고 사용하였음.
	// form Data의 요청헤더 타입이  application/json이 아니므로 @RequestBody를 사용한 매핑을 시도하면 415(지원하지 않는 형식) 에러가 발생함.
	// 1)서로다른 model class를 베이스로하고, 2)원하는 방식으로  Custom Mapping의 필요성으로 별도로  Jackson에 대한 Bean등록을 실행함. 
	public GetAttraction() {
		this.objectMapper = new ObjectMapper();
		
	}
	
	public GetAttraction(ObjectMapper objectMapper) {
			this.objectMapper = objectMapper;
			
	}
	 
	@Autowired DiaryDao getInfo;
	@Autowired CombinedLists lists;
	public CombinedLists getInfo(String jsonData){
		List<Attraction> pickNum = null;
		List<DiaryWriter> date = null;	
		try {
			JsonNode node = objectMapper.readTree(jsonData);
			pickNum = Arrays.asList(objectMapper.readValue(node.get(0).toString(), Attraction[].class));
			date = Arrays.asList(objectMapper.readValue(node.get(1).toString(), DiaryWriter[].class));	
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	
		StringBuilder queryBuilder = beanFactory.stringBuilderFactory();
		for(int i=0 ; i< pickNum.size(); i++) {
			queryBuilder.append("(");
			queryBuilder.append(pickNum.get(i).getAttraction_num()).append(",");
		}
		queryBuilder.setLength(queryBuilder.length()-1);
		queryBuilder.append(")");	
		String query =queryBuilder.toString(); 
	
		List<Attraction> data = getInfo.getAttractionInfo(query);
		
		lists.setList1(data);
		lists.setList2(date);
		
		return lists;
	}

}
