import React, { useState } from 'react';
import { FaCreditCard, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { processBooking } from '../services/bookingService';
//import { processPayment } from '../services/paymentService';
import Cookies from 'js-cookie';

const PaymentGateWay = ({
  totalAmount,
  selectedSeats,
  token,
  scheduleId,
}) => {
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    securityCode: '',
    paymentType: 'Card Payment', // Use the correct enum value
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required.';
    if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits.';
    if (!formData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required.';
    if (!formData.expiryYear) newErrors.expiryYear = 'Expiry year is required.';
    if (!/^\d{3}$/.test(formData.securityCode)) newErrors.securityCode = 'Security code must be 3 digits.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle booking process
  const handleBooking = async (bookingData) => {
    try {
      const bookingResponse = await processBooking(bookingData, token);
      if (bookingResponse) {
        console.log('Booking response', bookingResponse);
        return bookingResponse;
      }
    } catch (error) {
      console.error('Error creating booking:', error.message);
      throw new Error('Failed to create booking');
    }
  };

  // Handle payment process
  // const handlePayment = async (formData) => {
  //   try {
  //     const paymentResponse = await processPayment(formData, token);
  //     if (paymentResponse) {
  //       console.log('Payment successful', paymentResponse);
  //       return paymentResponse;
  //     }
  //   } catch (error) {
  //     console.error('Error processing payment:', error.message);
  //     throw new Error('Failed to process payment');
  //   }
  // };

  // Submit handler
  const handlePayNow = async () => {
    if (validateForm()) {
      const currentUser = Cookies.get('id'); // Retrieve userId from cookies
      const { paymentType } = formData;

      const bookingData = {
        userId: currentUser,
        scheduleId,
        paymentType,
        seats : selectedSeats,
        amount: totalAmount,
        paymentStatus: 'Completed',
        paymentDate: Date.now(),
        transactionReference: 'some-unique-reference', // Generate or retrieve a unique reference
    
      };

      console.log('Booking data:', bookingData);
      console.log('Form data:', formData);
      console.log('token', token);

      try {
        setLoading(true);
        await handleBooking(bookingData);
        //await handlePayment(formData);
        // Redirect to success page
        router.push('/home');
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    router.push('/search');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 p-4">
      <div
        className="relative w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
        style={{ maxWidth: '600px' }}
      >
        {/* Cancel Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={handleCancel}
        >
          <FaTimes className="text-2xl" />
        </button>

        <div className="w-full pt-1 pb-5">
          <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
            <FaCreditCard className="text-3xl" />
          </div>
        </div>
        <div className="mb-3">
          <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
        </div>
        <div className="mb-6 text-center font-bold text-[15px]">
          <h1>Payment Amount: Rs.{totalAmount}</h1>
        </div>
        <div className="mb-3 flex -mx-2">
          <div className="px-2">
            <label htmlFor="type1" className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                name="paymentType"
                value="Card Payment"
                checked={formData.paymentType === 'Card Payment'}
                onChange={handleChange}
              />
              <img
                alt="visa"
                src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                className="h-8 ml-3"
              />
            </label>
          </div>
          <div className="px-2">
            <label htmlFor="type2" className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                name="paymentType"
                value="PayPal"
                onChange={handleChange}
              />
              <img
                alt="paypal"
                src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
                className="h-8 ml-3"
              />
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Smith"
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm">{errors.cardName}</p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Card number</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="0000 0000 0000 0000"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1">Expiration month</label>
            <select
              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleChange}
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={String(index + 1).padStart(2, '0')}>
                  {String(index + 1).padStart(2, '0')} -{' '}
                  {new Date(0, index).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>
            {errors.expiryMonth && (
              <p className="text-red-500 text-sm">{errors.expiryMonth}</p>
            )}
          </div>
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1">Expiration year</label>
            <select
              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.expiryYear && (
              <p className="text-red-500 text-sm">{errors.expiryYear}</p>
            )}
          </div>
        </div>
        <div className="mb-10">
          <label className="font-bold text-sm mb-2 ml-1">Security code</label>
          <div>
            <input
              className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="000"
              type="text"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleChange}
            />
            {errors.securityCode && (
              <p className="text-red-500 text-sm">{errors.securityCode}</p>
            )}
          </div>
        </div>
        <div>
          <button
            disabled={loading}
            className={`block w-full ${
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            } max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold`}
            onClick={handlePayNow}
          >
            <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateWay;