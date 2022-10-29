package org.sangokch.web;

import java.util.List;
import java.util.Map;

import org.sangokch.model.Board;
import org.sangokch.model.ResponseData;
import org.sangokch.service.BoardService;
import org.sangokch.service.TestService;
import org.sangokch.util.Const;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DefaultController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass().getSimpleName());

	@Autowired
	TestService testService;
	
	@Autowired
	BoardService boardService;
	
	private ResponseData getRes(String initResult) {
		return new ResponseData(initResult);
	}
	
	
	@RequestMapping("/")
	public String index(Model model) {
		
		return "index";
	}
	
	@RequestMapping("/board/select")
	public @ResponseBody ResponseData select(@RequestBody Map<String, Object> params) {
		ResponseData res = getRes("success");
		int offset = -1;
		if (params.containsKey("pageno")) {
			offset = (Integer.parseInt(params.get("pageno").toString()) - 1) * Const.rowPerPage;
			logger.info("limit: {}, offset: {}", Const.rowPerPage, offset);
			params.put("limit", Const.rowPerPage);
			params.put("offset", offset);
		}
		List<Board> boards = boardService.selectBoard(params);
		
		res.setData(boards);
		if (params.containsKey("pageno")) {
			String nextYn = boardService.selectBoardTotalCnt() > Integer.parseInt(params.get("pageno").toString()) * Const.rowPerPage ? "Y" : "N";
			res.setNextYn(nextYn);
			res.setPageno(nextYn.equals("Y") ? String.valueOf(Integer.valueOf(params.get("pageno").toString()) + 1) : params.get("pageno").toString());
		}
		
		return res;
	}
	
	
}
