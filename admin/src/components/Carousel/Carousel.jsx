import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Import the CSS file for styling

const Carousel = ({ orders, handleUpdateStatus }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {orders.map((order, index) => (
        <div key={index} className="carousel-item">
          {orders.map((singleOrder) => (
            <div key={singleOrder._id} className="order-column">
              <img src="mosob.png" alt="mosob" />

              <p className="order-item-phone">{singleOrder.address.phone}</p>
              <p>Items: {singleOrder.items.length}</p>
              <p>{singleOrder.amount} ETB</p>
              <select
                onChange={(event) => handleUpdateStatus(event, singleOrder._id)}
                value={singleOrder.status}
                className="order-items-select"
              >
                <option value="preparing">Preparing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </Slider>
  );
};

Carousel.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
          })
        ).isRequired,
        amount: PropTypes.number.isRequired,
        address: PropTypes.shape({
          phone: PropTypes.string.isRequired,
        }).isRequired,
        status: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  handleUpdateStatus: PropTypes.func.isRequired,
};

export default Carousel;
