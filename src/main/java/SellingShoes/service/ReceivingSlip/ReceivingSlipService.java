package SellingShoes.service.ReceivingSlip;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import SellingShoes.model.RecevingSlip.ReceivingSlip;
import SellingShoes.repository.ReceivingSlipRepository.ReceivingSlipRepository;

@Service
public class ReceivingSlipService{
	@Autowired
	private ReceivingSlipRepository receivingSlipRes;
	public List<ReceivingSlip> getReceivings(){
		return receivingSlipRes.findAll();
	}
	public ReceivingSlip saveReceiving_Slip(ReceivingSlip rec){
		return receivingSlipRes.save(rec);
	}
	
	public String deleteReceiving_Slip(String receivingid){
		receivingSlipRes.deleteById(receivingid);
		 return "Delete success"+receivingid;
	}
}
