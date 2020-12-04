package SellingShoes.repository.ReceivingSlipRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import SellingShoes.model.RecevingSlip.ReceivingSlip;

public interface ReceivingSlipRepository extends JpaRepository <ReceivingSlip, String>{
	
}