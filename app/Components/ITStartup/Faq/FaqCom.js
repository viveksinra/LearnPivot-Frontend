import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from "react-accessible-accordion";

const  csseMockFaqData= [
  {
      id: "1",
      question: "What test papers are covered in each mock test?",
      answer: "Two papers - Mathematics (60 minutes) and English (70 minutes) with a 15-minute break."
  },
  {
      id: "2",
      question: "When and how will I receive the results?",
      answer: "Results are usually sent within a few hours of the test but may take up to 2 days. A detailed result will be posted on your private WhatsApp number."
  },
  {
      id: "3",
      question: "Will I receive the test papers?",
      answer: "Marked papers are posted by first-class signed delivery (usually next day, up to 3 days). "
  },
  {
      id: "4",
      question: "What should children bring for the test?",
      answer: "HB pencil, black biro, eraser, sharpener, water bottle, and snacks."
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
      answer: "We welcome all children and provide extra time with an exam board letter. "
  },
  {
      id: "10",
      question: "What post-test support is available?",
      answer: "A paid revision session is organized 5 days after the test to help children understand difficult questions. An overall anonymous result showing marks is shared. While we don't usually offer one-to-one feedback, we try our best to cater to individual needs."
  },
  {
    id: "11",
    question: "What is your booking and CANCELLATION policy?",
    answer: "We have a <strong>no-cancellation policy. No changes are allowed after booking</strong>. Only pre-booked children are allowed on the day of the test, and we don't accept cash payments at the venue."
},
  {
      id: "12",
      question: "How difficult are the tests?",
      answer: "All our mock tests are in line with the real CSSE standard."
  },
  {
      id: "13",
      question: "What if I don't receive my CSSE marked papers?",
      answer: "Usually, the post arrives 2 days after the test, but please allow up to 10 working days for Royal Mail delivery. Please do not contact us unless 10 days have passed."
  }
];
const  fsseMockFaqData= [
  {
      id: "1",
      question: "What test papers are covered in each mock test?",
      answer: "Three papers - Paper 1 and 2 (Maths/English/Verbal Reasoning, 30-40 minutes each) and Paper 3 (Creative Writing, 20 minutes) with a 15-minute break."
  },
  {
      id: "2",
      question: "When and how will I receive the results?",
      answer: "Results are usually sent within a few hours of the test but may take up to 2 days. A detailed result will be posted on your private WhatsApp number."
  },
  {
      id: "3",
      question: "Will I receive the test papers?",
      answer: "PDF file with incorrect questions, scanned answer sheets, and creative writing will be sent via WhatsApp within 3 days."
  },
  {
      id: "4",
      question: "What should children bring for the test?",
      answer: "2 black biros, water bottle, and snacks."
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
      answer: "We welcome all children but no extra time is provided. For both tests, parents must contact us in advance for any special requirements."
  },
  {
      id: "10",
      question: "What post-test support is available?",
      answer: "A paid revision session is organized 5 days after the test to help children understand difficult questions. An overall anonymous result showing marks is shared. While we don't usually offer one-to-one feedback, we try our best to cater to individual needs."
  },
  {
      id: "11",
      question: "What is your booking and CANCELLATION policy?",
      answer: "We have a <strong>no-cancellation policy. No changes are allowed after booking</strong>. Only pre-booked children are allowed on the day of the test, and we don't accept cash payments at the venue."
  },
  {
      id: "12",
      question: "How difficult are the tests?",
      answer: "We try our best to maintain a challenging level, though we don't have access to actual FSCE papers."
  },
];

const faqData = [
  {
    id: "1",
    question: "What services do you provide for 11+ preparation?",
    answer: "We offer expert tuition for students preparing for the 11+ exams, focusing on both CSSE and FSCE formats. Our services include group courses, mock exams, and personalised help for parents."
  },
  {
    id: "2",
    question: "Who are your tutors?",
    answer: "Our tutors are highly experienced professionals with a deep understanding of 11+ requirements and years of experience helping students succeed."
  },
  {
    id: "3",
    question: "What areas do your services cover?",
    answer: "We specialise in preparing students for grammar schools not only in our area (KEGS, CCHS etc.), but also around the country."
  },
  {
    id: "4",
    question: "How does your tuition work?",
    answer: "We offer: Group Courses: Small, focused groups where every child is involved. Mock Exams: Realistic practice under timed conditions, with detailed feedback within 24-48 hours. Practice Materials: Custom resources aligned with the FSCE and CSSE formats to help your child practice outside of our courses."
  },
  {
    id: "5",
    question: "When should my child start preparing?",
    answer: "Every child and situations is different. Although we recommend starting preparation 12-18 months in advance, our courses range from Year 4, all the way through to the summer before the exam, ensuring your child is confident until the end."
  },
  {
    id: "6",
    question: "Do you offer mock exams?",
    answer: "Yes, we conduct mock exams throughout the year. These help students experience exam conditions and receive detailed feedback to identify areas for improvement."
  },
  {
    id: "7",
    question: "How do you tailor your services to my child's needs?",
    answer: "We begin with an initial assessment to understand your child's strengths and areas for improvement. This allows us to learn where they are and which class would be best suited."
  },
  {
    id: "8",
    question: "Where are your courses held?",
    answer: "Our courses are conducted on Zoom. Each child will answer questions throughout the class with direct messaging available between our tutor and your child."
  },
  {
    id: "9",
    question: "How do I enrol my child in your program?",
    answer: "You can enrol by contacting us via our website or simply booking a class online. We will guide you through the process and ensure you are satisfied."
  },
  {
    id: "10",
    question: "What makes your services unique?",
    answer: "We pride ourselves on: Expert tutors with proven results, an adaptive approach to learning, comprehensive resources tailored to FSCE and CSSE formats, and a supportive and nurturing environment to help your child thrive and succeed."
  },
  {
    id: "11",
    question: "Do you provide support for parents?",
    answer: "Yes, we keep parents informed about their child's progress through regular updates, homework tasks and provide guidance on supporting 11+ preparation outside of our courses."
  },
  {
    id: "12",
    question: "How do I find out more?",
    answer: "Feel free to contact us directly through our website or phone to discuss your child's needs and how we can help them succeed in their 11+ journey."
  }
];
  

const FaqCom = ({dataType}) => {
  return (
    <div className="faq-area ptb-100">
      <div className="container">
      <div className="section-title">
  {/* <span className="sub-title">Answers to Common Questions</span> */}
  <h2>Frequently Asked Questions</h2>
  <p>
    Have questions about our { dataType === "csseMockFaqData" ? "CSSE Mock Test" : dataType === "fsseMockFaqData" ? "FSSE Mock Test" : "teaching services"}. Find answers below. We believe
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
                {dataType === "csseMockFaqData" && csseMockFaqData.map((faq) => (
                  <AccordionItem key={faq.id} uuid={faq.id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>{faq.question}</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p className="accordion-content" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
                {dataType === "fsseMockFaqData" && fsseMockFaqData.map((faq) => (
                  <AccordionItem key={faq.id} uuid={faq.id}>
                    <AccordionItemHeading>
                      <AccordionItemButton>{faq.question}</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p className="accordion-content" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
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
