package com.shoppingmalls.com.shops;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ShopsController {

	@Autowired
	public ShopsService shopService;
	
	@RequestMapping(value="allShops", method = RequestMethod.GET)
	public List<Shops> getALLShops(){
		return shopService.getALlShops(); 
	}
	
	@RequestMapping(value="getShop/{id}", method=RequestMethod.GET)
	public Optional<Shops> getShop(@PathVariable String id){
		return shopService.getShop(id);
	}
	
	@RequestMapping(value="addShop", method=RequestMethod.POST)
	public void addShop(@RequestBody Shops shop ) {
		shopService.addShop(shop);
	}
	@RequestMapping(value="update",method=RequestMethod.PUT)
	public void updateShop(@RequestBody Shops shop) {
		shopService.updateShop(shop);System.out.println(shop.ownerName+ "owner name");
	}
	
	@RequestMapping(value="delete/{id}")
	public void deleteShop(@PathVariable String id) {
		shopService.deleteShop(id);
	}
}
