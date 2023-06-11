package config;

import java.util.LinkedHashSet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LinkedHashSetConfig {
	
	@Bean
	public LinkedHashSet<Integer> uniqueModalNum () {
		
		return new LinkedHashSet<Integer>();
	}

}
