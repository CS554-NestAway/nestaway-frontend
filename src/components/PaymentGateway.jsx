import React, { useEffect, useState, useContext } from "react";
import PaymentButton from "./PaymentButton";
import { useNavigate } from "react-router-dom";
import api, { HostURL, BookingURL, CreditsURL } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import TermsAndConditionsModule from "./TermsAndConditionsModule";

function PaymentGateway({ checkIn, checkOut, houseId }) {
    const navigateTo = useNavigate();
    checkIn = "2099-07-22";
    checkOut = "2099-07-23";
    houseId = "6638decb7fc17dac33c92c41";
    const [houseInfo, setHouseInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [nights, setNights] = useState(0);
    //   const [paid, setPaid] = useState(false);
    //   const [paymentInfo, setPaymentInfo] = useState();
    const [creditsBalance, setCreditsBalance] = useState(0);
    const [enoughBalance, setEnoughBalance] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceResponse = await api.get(CreditsURL);
                setCreditsBalance(balanceResponse.data);
                const houseResponse = await api.get(HostURL + houseId);
                const fetchedHouseInfo = houseResponse.data;
                setHouseInfo(houseResponse.data);

                const differenceInTime =
                    new Date(checkOut).getTime() - new Date(checkIn).getTime();
                const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                const numberOfDays = Math.round(differenceInDays);

                setNights(numberOfDays);

                const st = numberOfDays * fetchedHouseInfo.price;
                setSubtotal(parseFloat(st.toFixed(2)));

                const t = st * 0.06625;
                setTaxes(parseFloat(t.toFixed(2)));

                const sf = st * 0.142;
                setServiceFee(parseFloat(sf.toFixed(2)));

                const tp = st + t + sf + 100;
                setTotalPrice(parseFloat(tp.toFixed(2)));
                const enoughResponse = await api.post(CreditsURL + 'checkCredits', { creditsToCheck: parseFloat(tp.toFixed(2)) });
                setEnoughBalance(enoughResponse.data);
                if (!enoughResponse.data) {
                    setError("Your credits balance now is not enough!");
                }
                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }
        };

        fetchData();
    }, [houseId, checkIn, checkOut]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        return <p>You don't login</p>
    }
    //   const changePaidState = () => {
    //     setPaid(true);
    //   };

    //   const getPaymentInfo = (paymentInfo) => {
    //     setPaymentInfo(paymentInfo);
    //   };
    const openModule = () => {
        setIsModalOpen(true);
    };

    const closeModule = () => {
        setIsModalOpen(false);
    };

    const onClickComfirm = async (e) => {
        e.preventDefault();
        const bookingInfo = {
            checkIn: checkIn,
            checkOut: checkOut,
            houseId: houseInfo._id.toString(),
            userId: currentUser.uid,
        };
        try {
            const addedBooking = await api.post(BookingURL + 'addBooking', bookingInfo);
            if (addedBooking.data.success) {
                await api.post(CreditsURL + 'deduct', { creditsToDeduct: totalPrice });
                navigateTo("/paymentSuccessful");
            }
        } catch (e) {
            console.log(e.response.data.error);
            setError(e.response.data.error);
        }
    };

    return (
        <div className="relative mx-auto w-full bg-white">
            <div className="grid min-h-screen grid-cols-10">
                {/* Left Section */}
                <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                    <div className="mx-auto w-full max-w-lg">
                        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                            Secure Checkout
                            <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
                        </h1>
                        <div className="text-center mt-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pay with NestAway credits</h2>
                            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                                <p className="font-bold">Your credits balance is:</p>
                                <p className="text-xl">{creditsBalance}</p>
                            </div>
                        </div>
                        {/* Terms and Conditions */}
                        <div className="mt-10 text-center text-sm font-semibold text-gray-500">
                            By placing this order you agree to the{' '}
                            <a
                                onClick={openModule}
                                className="whitespace-nowrap text-teal-400 underline hover:text-teal-600 cursor-pointer"
                            >
                                Terms and Conditions
                            </a>
                        </div>
                        {isModalOpen ? <TermsAndConditionsModule isOpen={openModule} onClose={closeModule} /> : <></>}
                        {/* Place Order Button */}
                        <button
                            onClick={onClickComfirm}
                            className={`mt-4 inline-flex w-full items-center justify-center rounded py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 ${!enoughBalance
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700 focus:bg-teal-500 focus:ring-teal-500"
                                }`}
                            disabled={!enoughBalance}
                        >
                            Confirm and Pay
                        </button>
                        {error && (
                            <div
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <strong className="font-bold">Error:</strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section (Order Summary) */}
                <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                    <h2 className="sr-only">Order summary</h2>
                    {/* Order Items List */}
                    <div>
                        {/* Background Image */}
                        <img
                            src={houseInfo.photos.main}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
                    </div>
                    {/* Order Details */}
                    <div className="relative">
                        <ul className="space-y-5">
                            <li className="flex justify-between">
                                <div className="inline-flex">
                                    <img
                                        src={houseInfo.photos.main}
                                        alt=""
                                        className="max-h-16"
                                    />
                                    <div className="ml-3">
                                        <p className="text-base font-semibold text-white">
                                            {houseInfo.title}
                                        </p>
                                        <p className="text-sm font-medium text-white text-opacity-80">
                                            {houseInfo.description}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-white">
                                    ${houseInfo.price}
                                </p>
                            </li>
                        </ul>
                        {/* Separator Line */}
                        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                        {/* Total and VAT */}
                        <div className="space-y-2">
                            <p className="flex justify-between text-lg font-bold text-white">
                                <span>Total price:</span>
                                <span>${totalPrice}</span>
                            </p>
                            <p className="flex justify-between text-sm font-medium text-white">
                                <span>
                                    ${houseInfo.price} x {nights} nights:
                                </span>
                                <span>${subtotal}</span>
                            </p>
                            <p className="flex justify-between text-sm font-medium text-white">
                                <span>Cleaning fee:</span>
                                <span>$100.00</span>
                            </p>
                            <p className="flex justify-between text-sm font-medium text-white">
                                <span>Nestaway service fee:</span>
                                <span>${serviceFee}</span>
                            </p>
                            <p className="flex justify-between text-sm font-medium text-white">
                                <span>Taxes:</span>
                                <span>${taxes}</span>
                            </p>
                        </div>
                    </div>

                    {/* Money Back Guarantee */}
                    <div className="relative mt-10 flex bg-gray-800 rounded-lg p-4">
                        <div className="flex flex-col text-white">
                            <span className="text-sm font-bold">
                                Cancellation & Change Policy
                            </span>
                            <span className="text-xs mt-2">
                                <strong>Cancellation:</strong> If a guest cancels their booking
                                more than {houseInfo.settings.cancellationDays} days before the
                                booking date, they are eligible for a full refund. If a guest
                                cancels within 7 days of the booking date, they will receive a
                                refund amounting to {houseInfo.settings.cancellationPercent}% of
                                the total booking cost.
                                <br />
                                <strong>Change:</strong> Guests can modify or change their
                                booking details (such as dates or number of guests) up to{" "}
                                {houseInfo.settings.changeDays} days before the booking date
                                without incurring any penalty or additional charges.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentGateway;
