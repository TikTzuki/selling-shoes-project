package SellingShoes.model.RecevingSlip;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@Table(name="receiving_slip")
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString 
public class ReceivingSlip{
	@Id
	@GeneratedValue 
	@Column(name="receiving_id")
	private String receivingid;
	@Column(name="purchase_order_id")
	private String purchaseorderid;
	@Column(name="description")
	private String description;
	@Column(name="create_date")
	private String createdate;
	@Column(name="date_received")
	private String datereceived;
	@Column(name="provider")
	private String provider;
	@Column(name="telephone")
	private String telephone;
	@Column(name="address")
	private String address;
	@Column(name="status")
	private String status;
	
	public String getReceivingId() {
		return receivingid;
	}
	
	 public void setReceivingId(String ReceivingId ) {
	     this.receivingid = receivingid;
	}
	 
	public String getPurchaseOrderId() {
		return purchaseorderid;
	}
	
	public void setCustomerName(String PurchaseOrderId) {
		this.purchaseorderid = purchaseorderid;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String Description) {
		this.description = description;
	}
	
	public String getCreateDate() {
		return createdate;
	}
	
	public void setCreateDate(String CreateDate) {
		this.createdate = createdate;
	}
	
	public String getDateReceived() {
		return datereceived;
	}
	
	public void setDateReceived(String DateReceived) {
		this.datereceived = datereceived;
	}
	
	public String getProvider() {
		return provider;
	}
	
	public void setProvider(String Provider) {
		this.provider = provider;
	}
	
	public String getTelephone() {
		return telephone;
	}
	
	public void setTelephone(String Telephone) {
		this.telephone = telephone;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String Address) {
		this.address = address;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String Status) {
		this.status = status;
	}

}
