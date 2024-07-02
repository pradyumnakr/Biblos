package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.CustomerDao;
import business.customer.CustomerForm;
import business.customer.Customer;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.concurrent.ThreadLocalRandom;

import business.JdbcUtils;
import business.BookstoreDbException;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;

	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao){ this.orderDao = orderDao;}
	public void setLineItemDao(LineItemDao lineItemDao){this.lineItemDao = lineItemDao;}

	public void setCustomerDao(CustomerDao customerDao){this.customerDao = customerDao;}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		int month = Integer.parseInt(monthString);
		int year = Integer.parseInt(yearString);
		Date date = new GregorianCalendar(year, month - 1, 01).getTime();
		return date;
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}
	private int generateConfirmationNumber(){
		return ThreadLocalRandom.current().nextInt(999999999);
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

		/*if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("expiryDate","Please enter a valid expiration date.");

		}*/

		String ccExpiryMonth = customerForm.getCcExpiryMonth();
		String ccExpiryYear = customerForm.getCcExpiryYear();
		if (expiryDateIsInvalid(ccExpiryMonth, ccExpiryYear)) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
		}

	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		try {
			YearMonth currentYearMonth = YearMonth.now();
			YearMonth expiryYearMonth = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
			if (expiryYearMonth.isBefore(currentYearMonth)) {
				throw new ApiException.ValidationFailure("expDate", "Invalid credit card expiry date.");
			}
			return false;
		} catch (NumberFormatException | DateTimeException e) {
			throw new ApiException.ValidationFailure("expDate", "Invalid credit card expiry format.");
		}

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
