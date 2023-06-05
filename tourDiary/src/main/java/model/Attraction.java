package model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Attraction {
	private String attraction_name, attraction_addr, site1, site2, attraction_detail, attraction_pic;
	private double latitude, longitude;
	
	@JsonProperty("attraction_num")
	private int attraction_num;
	public String getAttraction_name() {
		return attraction_name;
	}
	public void setAttraction_name(String attraction_name) {
		this.attraction_name = attraction_name;
	}
	public String getAttraction_addr() {
		return attraction_addr;
	}
	public void setAttraction_addr(String attraction_addr) {
		this.attraction_addr = attraction_addr;
	}
	public String getSite1() {
		return site1;
	}
	public void setSite1(String site1) {
		this.site1 = site1;
	}
	public String getSite2() {
		return site2;
	}
	public void setSite2(String site2) {
		this.site2 = site2;
	}
	public String getAttraction_detail() {
		return attraction_detail;
	}
	public void setAttraction_detail(String attraction_detail) {
		this.attraction_detail = attraction_detail;
	}
	public String getAttraction_pic() {
		return attraction_pic;
	}
	public void setAttraction_pic(String attraction_pic) {
		this.attraction_pic = attraction_pic;
	}
	
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public int getAttraction_num() {
		return attraction_num;
	}
	public void setAttraction_num(int attraction_num) {
		this.attraction_num = attraction_num;
	}
	
	

}
