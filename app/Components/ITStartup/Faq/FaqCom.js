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
      id: "a",
      question: "What subjects and materials do you teach?",
      answer:
        "As an educator teaching students from grades 3 to 8, I cover a wide range of subjects and materials including mathematics, science, language arts, social studies, and more. I provide comprehensive lessons tailored to each grade level, ensuring students receive a well-rounded education."
    },
    {
      id: "b",
      question: "How do you ensure student engagement in online classes?",
      answer:
        "Student engagement is a top priority in my online classes. I utilize interactive teaching methods, multimedia resources, and real-world examples to keep students actively involved in the learning process. Additionally, I encourage participation through group discussions, interactive quizzes, and hands-on activities."
    },
    {
      id: "c",
      question: "What support do you offer for students with different learning needs?",
      answer:
        "I believe in providing personalized support for students with different learning needs. Whether a student requires extra assistance, enrichment opportunities, or accommodations, I work closely with them to ensure their success. I offer additional resources, one-on-one tutoring, and differentiated instruction to meet the diverse needs of all learners."
    },
    {
      id: "d",
      question: "How do you track student progress and assess learning?",
      answer:
        "Tracking student progress and assessing learning is essential for academic growth. I employ various assessment strategies such as quizzes, tests, projects, and discussions to evaluate student understanding. Additionally, I provide timely feedback and adjust instruction based on student performance to support their ongoing development."
    },
    {
      id: "e",
      question: "What resources do you provide to support remote learning?",
      answer:
        "In the digital age, I understand the importance of providing resources to support remote learning. I offer access to online textbooks, educational websites, interactive learning platforms, and multimedia resources to enhance the learning experience. Additionally, I provide guidance and technical support to ensure students can navigate and utilize these resources effectively."
    },
    {
      id: "f",
      question: "How can parents get involved in their child's education?",
      answer:
        "Parent involvement is crucial for student success. I encourage parents to actively participate in their child's education by staying informed about classroom activities, attending parent-teacher conferences, and providing support at home. Additionally, I welcome open communication and collaboration with parents to address any concerns and ensure a positive learning experience for their child."
    },
    {
      id: "g",
      question: "What measures do you take to create a safe and inclusive learning environment?",
      answer:
        "Creating a safe and inclusive learning environment is a top priority in my classroom. I foster a culture of respect, empathy, and acceptance where all students feel valued and supported. I address bullying and discrimination promptly, promote diversity and inclusivity in curriculum and classroom discussions, and provide opportunities for students to share their perspectives and experiences."
    }
  ];
  

const FaqCom = () => {
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
                {faqData.map((faq) => (
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
