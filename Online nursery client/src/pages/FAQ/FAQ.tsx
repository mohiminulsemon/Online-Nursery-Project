import { FaQuestionCircle } from "react-icons/fa";
import ScrollToTopButton from "../Home/ScrollToTopButton";

const FAQ = () => {
    const data = [
        {
            id: 1,
            list : "01. The order",
            qus1: "When do I receive my order?",
            ans1:"When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
            qus2 : "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
            ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
            qus3: "When will I receive the invoice for my order?",
            ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice."
        },
        {
            id: 2,
            list : "02. Shipment",
            qus1: "When do I receive my order?",
            ans1:"When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
            qus2 : "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
            ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
            qus3: "When will I receive the invoice for my order?",
            ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice."
        },
        {
            id: 3,
            list : "03. The order",
            qus1: "When do I receive my order?",
            ans1:"When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
            qus2 : "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
            ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
            qus3: "When will I receive the invoice for my order?",
            ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice."
        },
        {
            id: 4,
            list : "04. Returns, exchanges and complaints",
            qus1: "When do I receive my order?",
            ans1:"When placing the order, a day of shipment is indicated. After the order has been placed, the same delivery time will also be stated on the order confirmation. It is therefore never possible that during the order, the shipping day on the website, is different than on the order confirmation.",
            qus2 : "I now see the longer delivery time of (a part of) my order. How can I cancel it?",
            ans2: "If the order has a longer delivery time than you had previously seen, it is of course possible to cancel (a part of) the order. For this you can contact our customer service. They will cancel the order for you. The purchase amount will be back on your bank account within two working days. When an order has already been shipped, it can no longer be cancelled.",
            qus3: "When will I receive the invoice for my order?",
            ans3: "When you have paid for the order, you will not automatically receive an invoice for your order. If you wish to receive an invoice, this can be done in two ways.The first way is through your account at our store. When you log in to your account you can see your orders and download the invoice."
        },

    ]
    return (
        <div>
           <div className="flex flex-col items-center justify-center mt-10">
            <FaQuestionCircle className="text-5xl"/>
            <h1 className="font-serif mt-2 text-3xl md:text-5xl mx-10 text-center mb-6">Frequently Asked Questions</h1>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 mt-0 md:mt-10 gap-4 md:gap-10 mx-10">
            {data.map((item) => (
                <div className="flex flex-col md:mt-2">
                    <h1 className="font-serif text-3xl text-black mb-3">{item.list}</h1>
                    <h1 className="font-serif text-xl text-gray-700 mb-1">{item.qus1}</h1>
                    <h1 className="font-serif text-base text-gray-500 mb-6">{item.ans1}</h1>
                    <h1 className="font-serif text-xl text-gray-700 mb-1">{item.qus2}</h1>
                    <h1 className="font-serif text-base text-gray-500 mb-6">{item.ans2}</h1>
                    <h1 className="font-serif text-xl text-gray-700 mb-1">{item.qus3}</h1>
                    <h1 className="font-serif text-base text-gray-500 mb-6">{item.ans3}</h1>
                  
                </div>
            ))}
           </div>
           <ScrollToTopButton />
        </div>
    );
};

export default FAQ;