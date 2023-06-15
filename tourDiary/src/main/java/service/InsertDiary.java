package service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dao.Dao;
import factory.AttractionSelectionFactory;
import factory.StringBuliderFactory;
import model.AttractionSelection;
import model.DiaryWriter;

@Service
public class InsertDiary {
	@Autowired DiaryWriter diaryContent;
	@Autowired ResourceLoader userPicResourceLoader;
	@Autowired ResourceLoader coursePicResourceLoader;
	@Autowired LinkedHashSet<Integer> uniqueModalNum;
	@Autowired HashMap<String, String> coursePicKeyVal;
	@Autowired ArrayList<Integer> coursePicKey;
	@Autowired ArrayList<String> coursePicValue;
	@Autowired StringBuliderFactory coursePicBuilder;
	@Autowired AttractionSelectionFactory userUpload;
	@Autowired ArrayList<AttractionSelection> uploadDataList;
	@Autowired StringBuliderFactory hashDataBuild;
	@Autowired Dao insertTextData;
	@Autowired Dao maxIndex;
	@Autowired Dao insertFileUpload;
	
	// 유저가 입력한 TEXT데이터와  업로드한 사진 파일에 대한 데이터 가공 및 저장처리.
	private final ObjectMapper objectMapper;
	private static final String UPLOAD_DIRECTORY = "upload/picture";
	
	public InsertDiary() {
		this.objectMapper = new ObjectMapper();
	}
	
	public InsertDiary (ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}
	
	public boolean insertDiary(HttpServletRequest request) {
		
		
		DiaryWriter[] hashData = null;
		AttractionSelection[] memoData = null;
		AttractionSelection[] attractionNum = null;
		String repPic = null;
		Enumeration<String> parameterNames = request.getParameterNames();
	    while (parameterNames.hasMoreElements()) {
	    	String key = parameterNames.nextElement();
	    	if(key.equals("contentTitle")) {
	    		diaryContent.setPost_Title(request.getParameter(key));
	    	}else if(key.equals("id")){
	    		diaryContent.setUser_Id(request.getParameter(key));
	    		
	    	}else if(key.equals("area")){
	    		diaryContent.setArea(request.getParameter(key));
	    	}else if(key.equals("writeContent")) {
	    		diaryContent.setPost_Body(request.getParameter(key));
	    	
	    	}else if(key.equals("departDate")) {
	    		diaryContent.setStart_date(request.getParameter(key));
	    	
	    	}else if(key.equals("endDate")) {
	    		diaryContent.setEnd_date(request.getParameter(key));
	    	
	    	}else if(key.equals("totalDate")) {
	    		diaryContent.setTotal_date(Integer.parseInt(request.getParameter(key)));
	    	
	    	}else if(key.equals("repPic")) {
	    		repPic = request.getParameter(key);
	    	
	    	}else if(key.equals("hashTag")){
	    		String hashTag = request.getParameter(key);
	    		if(!hashTag.equals("") && !hashTag.equals(null)) {
	    			try {
	    				hashData = objectMapper.readValue(hashTag, DiaryWriter[].class);
	    				StringBuilder hashDataBuilder = hashDataBuild.stringBuilderFactory();
	    				for(int i=0 ; i<hashData.length ; i++) {
	    					hashDataBuilder.append(hashData[i].getHashTag()).append("/");
	    				}
	    				diaryContent.setHashTag(hashDataBuilder.toString());
		
					} catch (JsonProcessingException e) {
						e.printStackTrace();
					}
	    		}
	    	
	    	}else if(key.equals("memo")) {
	    		String memo = request.getParameter(key);
	    		try {
	    			if(!memo.equals("") && !memo.equals(null)) {
	    				memoData = objectMapper.readValue(memo, AttractionSelection[].class);
	    			
	    			}
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
	    	}else if(key.equals("attractionNum")) {
	    		String attractionNumber = request.getParameter("attractionNum");
	    		try {
	    			attractionNum = objectMapper.readValue(attractionNumber, AttractionSelection[].class);
	    			
				} catch (JsonProcessingException e) {
					e.printStackTrace();
				}
	    	}
	    }	    
		int modalLength = 0; 
		
		if (request instanceof MultipartHttpServletRequest) {
		    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		    MultiValueMap<String, MultipartFile> fileMap = multipartRequest.getMultiFileMap();
		        
		    if (!fileMap.isEmpty()) {
		        for (String key : fileMap.keySet()) {
		            List<MultipartFile> files = fileMap.get(key);
		            
		            for (MultipartFile file : files) {
		                String originFileName = file.getOriginalFilename();
		                
		                if (originFileName != null && !originFileName.isEmpty()) {
		                    if(key.equals("userPic")) {
		                    	String originaluserPicName = file.getOriginalFilename();	
		                    	String fileExtension = originaluserPicName.substring(originaluserPicName.lastIndexOf("."));
		                    	String newFileName = UUID.randomUUID().toString()+fileExtension;
		                    	
		                    	diaryContent.setUserPic(newFileName);
		                    	
		                    	Resource resource = userPicResourceLoader.getResource(UPLOAD_DIRECTORY);
		                    	try {
									Path uploadPath = resource.getFile().toPath();
									if(!Files.exists(uploadPath)) {
										Files.createDirectories(uploadPath);
									}
									Path filePath = uploadPath.resolve(newFileName);
									Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
								} catch (IOException e) {
									e.printStackTrace();
								}	
		                    }else {
		                    	String fileKey = file.getName();
		                    	String modalNum = fileKey.split("-")[0];
		                    	coursePicKey.add(Integer.parseInt(modalNum));
		                    	uniqueModalNum.add(Integer.parseInt(modalNum));
		                   
		                    	
		                    	String originalPicName = file.getOriginalFilename();	
		                    	String fileExtension = originalPicName.substring(originalPicName.lastIndexOf("."));
		                    	String newFileName = UUID.randomUUID().toString() + fileExtension;
		                    	coursePicValue.add(newFileName);
		                    	coursePicKeyVal.put(fileKey, newFileName);	
		                    	Resource resource = coursePicResourceLoader.getResource(UPLOAD_DIRECTORY);
		                    	
		                    	try {
									Path uploadPath = resource.getFile().toPath();
									if(!Files.exists(uploadPath)) {
										Files.createDirectories(uploadPath);
									}
									Path filePath = uploadPath.resolve(newFileName);
									Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
								} catch (IOException e) {
									e.printStackTrace();
								}	
		                    }
		                }
		            }
		        }
		    }
		    modalLength = uniqueModalNum.size();
		} 
		diaryContent.setRepPic(coursePicKeyVal.get(repPic));
		
		// 모달에 대한 고유번호의 배열 
		int[] modalUniqueNumArr = new int[modalLength];
		int index = 0;
		for(int modalNum : uniqueModalNum) {
			modalUniqueNumArr[index] = modalNum;
			index++;
		}
		// 스트링빌더 객체의 동적생성 factory패키지 내부 틀래스 이용.
		StringBuilder[] cousePictures  = new StringBuilder[modalLength];
		for(int i=0; i<modalLength ;i++ ) {
			cousePictures[i] = coursePicBuilder.stringBuilderFactory();
		}
		
		for(int i=0; i<coursePicKey.size();i++) {
			for(int j=0;j<modalUniqueNumArr.length;j++) {
				if(modalUniqueNumArr[j] == coursePicKey.get(i)) {
					cousePictures[j].append(coursePicValue.get(i)).append("/");
				}
				
			}
		}
		
		AttractionSelection[] uploadData = new  AttractionSelection[attractionNum.length];
		for(int i=0; i<attractionNum.length; i++) {
			uploadData[i] = userUpload.attractionSelcetionFactory();
			uploadData[i].setAttraction_Num(attractionNum[i].getAttraction_Num());
			uploadData[i].setMemo(memoData[i].getMemo());
			uploadDataList.add(uploadData[i]);
		}
		
		if(modalLength != 0) {
			for(int i=0; i<modalUniqueNumArr.length;i++) {
				for(int j=0; j<uploadDataList.size();j++) {
					if(modalUniqueNumArr[i]==j) {
						uploadDataList.get(j).setSpotPic(cousePictures[i].toString());
					}
				}
			}
			
		}
		
		// 유저가입력한 TEXT데이터, 대표사진, 유저사진 등의 파일 업로드에 대한 insert
		// 또한 upload데이터의 insert시 필요한 post_Num를 추출하여 uploadData가 담긴 List에 add해줌.
		insertTextData.insertUserWrite(diaryContent);
		int uploadIndex = maxIndex.getMaxIndex();
		
		for(int i=0 ; i<uploadDataList.size(); i++) {
			uploadDataList.get(i).setPost_Num(uploadIndex);
		}
		
		int batchSize = 10;
		int dataSize = uploadDataList.size();
		int batchCount = ((batchSize+dataSize)-1)/batchSize;  
		boolean success = false;
		for(int i=0 ; i<batchCount; i++) {
			int from = i*batchSize;
			int to = Math.min((i+1)*batchSize, dataSize);
			
			List<AttractionSelection> subList = uploadDataList.subList(from, to);
			
			success = insertFileUpload.insertUserUpload(subList);
		}
		
		request.setAttribute("post_Num", uploadIndex);
		
		
		return success; 
	}

}
