package org.sangokch.web;

import org.sangokch.service.BoardService;
import org.sangokch.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DefaultController {

	@Autowired
	TestService testService;
	
	@Autowired
	BoardService boardService;
	
//	@Autowired
//	private SqlSessionFactory sqlSessionFactory;
	
	@RequestMapping("/")
	public String index(Model model) {
		
		return "index";
	}
	
	
}
