package com.shoppingmalls.com.shops;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopsService {

	@Autowired
	public ShopsRepository shopsRepository;
	
	public List<Shops> getALlShops(){
		List<Shops> list = new ArrayList<>();
		shopsRepository.findAll().forEach(list::add);
		return list;
	}
	
	public Optional<Shops> getShop(String id){
		
		return shopsRepository.findById(id);
		
	}
	
	public void addShop(Shops shops) {
		shopsRepository.save(shops);
	}
	
	public void updateShop(Shops shop) {
		shopsRepository.save(shop);
	}
	
	public void deleteShop(String id) {
		shopsRepository.deleteById(id);
	}
}
