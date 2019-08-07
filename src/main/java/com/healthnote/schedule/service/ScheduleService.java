package com.healthnote.schedule.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthnote.members.dao.ScheduleDAO;
import com.healthnote.vo.RoutineDTO;
import com.healthnote.vo.ScheduleDTO;

@Service
public class ScheduleService {

	@Autowired
	private SqlSession sqlsession;

	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 현재 날짜와 트레이너 아이디를 받아서 현재 날짜가 포함된 주의 월 ~ 일 간의 모든 해당 트레이너의 수강생들의 PT일정을 가져옴 
	*/
	public ArrayList<ScheduleDTO> getAllWeekSchedule(String trainerId, String today) {

		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("trainerId", trainerId);
		map.put("today", today);
		
		ArrayList<ScheduleDTO> scheduledto = dao.getAllWeekSchedule(map);
		
		return scheduledto;
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	public ArrayList<RoutineDTO> getDailyRoutine(String memberId, String today) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("memberId", memberId);
		map.put("today", today);
		
		ArrayList<RoutineDTO> routinedto = dao.getDailyRoutine(map);
		
		return routinedto;
	}
	
	/*
	날 짜 : 2019. 08. 06.
	작성자 : 김 정 권
	기 능 : 특정 수강생의 아이디와 날짜를 받아서 해당 날짜가 포함된 주의 월요일부터 일요일까지의 해당 수강생의 모든 운동 루틴을 가져옴 
	*/
	public HashMap<String, ArrayList<RoutineDTO>> getWeekRoutine(String memberId, String today) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> parammap = new HashMap<String, String>();
		parammap.put("memberId", memberId);
		parammap.put("today", today);
		
		ArrayList<RoutineDTO> routinedto = dao.getWeekRoutine(parammap);
		
		HashSet<String> dateset = new HashSet<String>();
		for(int i = 0; i < routinedto.size(); i++) {
			dateset.add(routinedto.get(i).getDate());
		}
		
		HashMap<String, ArrayList<RoutineDTO>> resultmap = new HashMap<String, ArrayList<RoutineDTO>>(); 
		ArrayList<RoutineDTO> dayroutinelist = null;
		String tempDate = null;
		for(String date : dateset) {
		dayroutinelist = new ArrayList<RoutineDTO>();
			for(int i = 0; i < routinedto.size(); i++) {
				
				if(date.equals(routinedto.get(i).getDate())) {
					dayroutinelist.add(routinedto.get(i));
				}
				
				if(i == routinedto.size() - 1) {
					resultmap.put(date, dayroutinelist);
				}
			}
		}
		
		return resultmap;

	}
	
	public String getTest(String email) {
		
		ScheduleDAO dao = sqlsession.getMapper(ScheduleDAO.class);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("email", email);
		
		System.out.println("dao start!");
		String test = dao.getTest(map);
		System.out.println("dao end!");
		
		return test;
		
		/*
		 * 심각: Servlet.service() for servlet [appServlet] in context with path [/main] threw exception 
		 * [Request processing failed; nested exception is org.mybatis.spring.MyBatisSystemException: 
		 * nested exception is org.apache.ibatis.exceptions.PersistenceException: 
### Error querying database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: 
Could not get JDBC Connection; nested exception is java.sql.SQLNonTransientConnectionException:
 Cannot load connection class because of underlying exception: com.mysql.cj.exceptions.WrongArgumentException:
  Malformed database URL, failed to parse the connection string near ';serverTimezone=UTC'.
### The error may exist in file [/Users/jungkwonkim/Desktop/jk_lab/STS_LAB/.metadata/.
plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/HealthNote/WEB-INF/classes/com/healthnote/mapper/ScheduleDAO.xml]
### The error may involve com.healthnote.members.dao.ScheduleDAO.getTest
### The error occurred while executing a query
		 * */
		
	}

}
