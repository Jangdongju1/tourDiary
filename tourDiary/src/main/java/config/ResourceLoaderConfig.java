package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.DefaultResourceLoader;

@Configuration
public class ResourceLoaderConfig {
	@Bean
	public DefaultResourceLoader resouceLoader() {
		
		return new DefaultResourceLoader();
	}

}
