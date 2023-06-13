package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.google.gson.Gson;

@Configuration
public class GsonConfig {
	@Bean
	public Gson getGson() {
		
		return new Gson();
	}

}
