package com.healthnote.main;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;

@Controller
public class HomeController {

	
	@RequestMapping(value = "/welcomeLogin", method = RequestMethod.GET)
	public String welcomeLogin(HttpSession request, Model model) {
		
		System.out.println("welcomeLogin");
		
	return "loginpage";
	
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginSuccess(HttpSession request, Model model) {
		
		System.out.println("loginSuccess");
		
		return "home";
		
	}
	
}
