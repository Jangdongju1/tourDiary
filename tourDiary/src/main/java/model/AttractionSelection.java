package model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AttractionSelection {
	private int select_Num , post_Num;
	private String memo, spotPic;
	
	@JsonProperty("attraction_num")
	private int attraction_Num;
	
	public int getSelect_Num() {
		return select_Num;
	}
	public String getSpotPic() {
		return spotPic;
	}
	public void setSpotPic(String spotPic) {
		this.spotPic = spotPic;
	}
	public void setSelect_Num(int select_Num) {
		this.select_Num = select_Num;
	}
	public int getPost_Num() {
		return post_Num;
	}
	public void setPost_Num(int post_Num) {
		this.post_Num = post_Num;
	}
	public int getAttraction_Num() {
		return attraction_Num;
	}
	public void setAttraction_Num(int attraction_Num) {
		this.attraction_Num = attraction_Num;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	

}
