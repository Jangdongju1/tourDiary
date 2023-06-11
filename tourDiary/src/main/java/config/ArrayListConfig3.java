package config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import model.AttractionSelection;
@Configuration
public class ArrayListConfig3 {
	@Bean
	public ArrayList<AttractionSelection> selection() { 
		
		return new ArrayList<AttractionSelection>();
	}

}
