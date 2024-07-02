package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.customer.CustomerForm;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();

		if (name == null || name.equals("") || name.length() > 45 || name.length() < 4) {
			throw new ApiException.ValidationFailure("name","Invalid name field");
		}

		String address = customerForm.getAddress();
		if (address == null || address.equals("") || address.length() > 45 || address.length() < 4){
			throw new ApiException.ValidationFailure("address","Invalid  address field");
		}

		String phone = customerForm.getPhone();
		if (phone == null || phone.equals("")) {
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}
		phone = phone.replace("-", "").replace("(", "").replace(")", "").replace(" ", "");
		if (phone.length() != 10) {
			throw new ApiException.ValidationFailure("phone","Invalid phone field");
		}

		String email = customerForm.getEmail();
		if (email == null || email.equals("")) {
			throw new ApiException.ValidationFailure("email","Invalid email field");
		}
		if (!email.contains("@") || email.contains(" ") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email","Invalid email field");
		}

		String creditCard = customerForm.getCcNumber();
		if (creditCard == null || creditCard.equals("")) {
			throw new ApiException.ValidationFailure("creditCard","Invalid credit card field");
		}
		creditCard = creditCard.replace("-", "").replace(" ", "");
		if (creditCard.length() < 14 || creditCard.length() > 16) {
			throw new ApiException.ValidationFailure("Invalid credit card field");
		}

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("expiryDate","Please enter a valid expiration date.");

		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		YearMonth expiryVal = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
		YearMonth currentVal = YearMonth.now();
		if (expiryVal.isBefore(currentVal)) {
			return true;
		}
		return false;

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0 || cart.getItems() == null || cart.getItems().equals("")) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Book price does not match.");
			}
			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Book category Id does not match.");
			}
			// TODO: complete the required validations
		});
	}

}
