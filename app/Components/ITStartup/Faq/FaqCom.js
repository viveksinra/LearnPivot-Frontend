import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from "react-accessible-accordion";

const faqData = [
  {
      id: "1",
      question: "What test papers are covered in each mock test?",
      answer: "CSSE: Two papers - Mathematics (60 minutes) and English (70 minutes) with a 15-minute break. FSCE: Three papers - Paper 1 and 2 (Maths/English/Verbal Reasoning, 30-40 minutes each) and Paper 3 (Creative Writing, 20 minutes) with a 15-minute break."
  },
  {
      id: "2",
      question: "When and how will I receive the results?",
      answer: "Results are usually sent within a few hours of the test but may take up to 2 days. A detailed result will be posted on your private WhatsApp number."
  },
  {
      id: "3",
      question: "Will I receive the test papers?",
      answer: "CSSE: Marked papers are posted by first-class signed delivery (usually next day, up to 3 days). FSCE: PDF file with incorrect questions, scanned answer sheets, and creative writing will be sent via WhatsApp within 3 days."
  },
  {
      id: "4",
      question: "What should children bring for the test?",
      answer: "CSSE: HB pencil, black biro, eraser, sharpener, water bottle, and snacks. FSCE: 2 black biros, water bottle, and snacks."
  },
  {
      id: "5",
      question: "Is parking available at the venue?",
      answer: "Yes, free parking is available on-site. Please drive slowly in the parking lot and be considerate towards others. Parents can stay in the parking area during the test."
  },
  {
      id: "6",
      question: "Are there facilities for parents at the venue?",
      answer: "There is no waiting room for parents. Parents can use the restroom except during break time. Parents can stay in the parking area during the test."
  },
  {
      id: "7",
      question: "Do you provide refreshments?",
      answer: "No refreshments are provided. Children can bring their own light snacks and a water bottle."
  },
  {
      id: "8",
      question: "What is your late arrival policy?",
      answer: "We are very strict about timing. Late arrivals will not be allowed. Please plan your journey in advance to avoid any disappointment."
  },
  {
      id: "9",
      question: "Do you accommodate children with special needs?",
      answer: "CSSE: We welcome all children and provide extra time with an exam board letter. FSCE: We welcome all children but no extra time is provided. For both tests, parents must contact us in advance for any special requirements."
  },
  {
      id: "10",
      question: "What post-test support is available?",
      answer: "A paid revision session is organized 5 days after the test to help children understand difficult questions. An overall anonymous result showing marks is shared. While we don't usually offer one-to-one feedback, we try our best to cater to individual needs."
  },
  {
      id: "11",
      question: "What is your booking and cancellation policy?",
      answer: "We have a strict no-cancellation policy. No changes are allowed after booking. Only pre-booked children are allowed on the day of the test, and we don't accept cash payments at the venue."
  },
  {
      id: "12",
      question: "How difficult are the tests?",
      answer: "CSSE: All our mock tests are in line with the real CSSE standard. FSCE: We try our best to maintain a challenging level, though we don't have access to actual FSCE papers."
  },
  {
      id: "13",
      question: "What if I don't receive my CSSE marked papers?",
      answer: "Usually, the post arrives 2 days after the test, but please allow up to 10 working days for Royal Mail delivery. Please do not contact us unless 10 days have passed."
  }
];
  

const FaqCom = ({dataType}) => {
  return (
    <div className="faq-area ptb-100">
      <div className="container">
      <div className="section-title">
  <span className="sub-title">Answers to Common Questions</span>
  <h2>Frequently Asked Questions</h2>
  <p>
    Have questions about our teaching services? Find answers below. We believe
    that clear communication and understanding are vital for successful
    learning experiences.
  </p>
</div>

        <div className="row">
          <div className="col-lg-12">
            <div className="faq-accordion">
              <Accordion allowZeroExpanded preExpanded={["a"]}>
                {dataType === "faqData" && faqData.map((faq) => (
                  <AccordionItem key={faq.id} uuid={faq.id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>{faq.question}</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p className="accordion-content">{faq.answer}</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqCom;
